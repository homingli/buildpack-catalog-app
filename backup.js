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

var datestr = new Date().toISOString().substr(0,13);

function upload_to_s3() {
  var s3 = require('s3');

  var client = s3.createClient({
    key: creds.s3key,
    secret: creds.s3secret,
    bucket: "buildpack-catalog-backups"
  });

  var uploader = client.upload(process.env.STACKATO_FILESYSTEM+"/"+datestr+".tar.bz2", datestr+".tar.bz2");
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function(amountDone, amountTotal) {
    console.log("progress", amountDone, amountTotal);
  });
  uploader.on('end', function(url) {
    if (url) { console.log("file available at", url); }
  });
}

if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;

  var backup_fs_path=process.env.STACKATO_FILESYSTEM + '/' + datestr;

  var cmd = [];
  cmd.push("mongodump --host ",dbcreds.host,":",dbcreds.port);
  cmd.push(" --username ",dbcreds.username);
  cmd.push(" --password ",dbcreds.password);
  cmd.push(" --collection buildpacks");
  cmd.push(" --db ",dbcreds.db);
  cmd.push(" --out ",backup_fs_path);
  cmd.push(" && tar cjvf ",backup_fs_path,".tar.bz2 ",backup_fs_path); // create bz2
  cmd.push(" && rm -rf ",backup_fs_path); // clean up

  execChild(cmd.join(''),function(){
    upload_to_s3();
    console.log("Backup completed on %s.", new Date().toUTCString());
  });

} else
  console.log("VCAP_SERVICES not in env, nothing happened.");
