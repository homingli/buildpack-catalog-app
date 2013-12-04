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
    });
  });

} else
  console.log("VCAP_SERVICES not in env, nothing happened.");
