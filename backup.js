var creds = require('./credentials.json');
var exec = require('child_process').exec;

function execChild(cmd, cb){
  var child = exec(cmd, function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error !== null) {
      console.error('exec error: ' + error);
    } else {
      cb();
    }
  })
}

function upload_to_s3() {
  // configure
  var s3 = require('s3');

  // createClient allows any options that knox does.
  var client = s3.createClient({
    key: creds.s3key,
    secret: creds.s3secret,
    bucket: "buildpack-catalog-backups"
  });

// upload a file to s3
var uploader = client.upload("latest_backup.tar.bz2", "latest_backup-"+new Date().toISOString().substr(0,10)+".tar.bz2");
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function(amountDone, amountTotal) {
  console.log("progress", amountDone, amountTotal);
});
uploader.on('end', function(url) {
  console.log("file available at", url);
});

}

if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;

  var backup_fs_path=process.env.STACKATO_FILESYSTEM + '/' + new Date().toISOString().substr(0,10);

  var cmd = [];
  cmd.push("mongodump --host ",dbcreds.host,":",dbcreds.port);
  cmd.push(" --username ",dbcreds.username);
  cmd.push(" --password ",dbcreds.password);
  cmd.push(" --collection buildpacks");
  cmd.push(" --db ",dbcreds.db);
  cmd.push(" --out ",backup_fs_path);

  execChild(cmd.join(''),function(){
    execChild('tar cjvf latest_backup.tar.bz2 '+backup_fs_path, function() {
      console.log("Backup completed on %s.", new Date().toUTCString());
      upload_to_s3();
    });
  });

} else
  console.log("VCAP_SERVICES not in env, nothing happened.");
