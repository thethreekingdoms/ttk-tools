'use strict'

var replace = require('replace');
var vfs = require('vinyl-fs');
const fs = require('fs');


var BusinessName = "Businessline"; //业务线名称
var businessName = "businessline";
var moduleName = "modulename"; //模块名称
var serviceName = businessName + "-" + moduleName; //微服务名称

var temppath = process.cwd();
console.log('当前业务操作base路径：'+temppath);


export  function addServiceFromTemplate(businessName_, moduleName_) {

      if (!businessName) {
          console.log("请输入业务线名称（英文）");
          return;
      }

      if (!moduleName) {
          console.log("请输入模块名称（英文）");
          return;
      }

      businessName = businessName_;
      BusinessName = businessName.substring(0, 1).toUpperCase() + businessName.substring(1);
      moduleName = moduleName_;
      serviceName = businessName + "-" + moduleName;

      console.log("正在进行文件复制和文件内容占位符替换。");
      var path = temppath + '/src/'+businessName;
      if( fs.existsSync(path) === true ){
          console.log("父目录已存在，直接增加服务。");
          vfs.src(temppath + '/src/microservice-template/tax/service/tax-sb/**/*')
              .pipe(vfs.dest(temppath + '/src/'+businessName+'/service/'+serviceName+'/'))
              .on('end', callbackForExist);
      }else{
          console.log("父目录不存在，创建骨架。");
          vfs.src(temppath + '/src/microservice-template/tax/**/*')
              .pipe(vfs.dest(temppath + '/src/'+businessName+'/'))
              .on('end', callback);
      }


}


function callbackForExist() {

    replace({
        regex: "sb",
        replacement: moduleName,
        paths: [temppath + '/src/'+businessName+'/service/'+serviceName],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "tax",
        replacement: businessName,
        paths: [temppath + '/src/'+businessName+'/service/'+serviceName],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "Tax",
        replacement: BusinessName,
        paths: [temppath + '/src/'+businessName+'/service/'+serviceName],
        recursive: true,
        silent: true,
    });

    //var path0 = temppath + "/src/tax/";
    var path0_replace = temppath + "/src/" + businessName;

    var path1 = path0_replace+"/service/tax-sb";
    var path1_replace = path0_replace+"/service/" + serviceName;

    var path2 = path1_replace + "/tax-sb-interface";
    var path2_replace = path1_replace + "/" + serviceName + "-interface";
    var path3 = path2_replace + "/src/main/java/com/ttk/tax";
    var path3_replace = path2_replace + "/src/main/java/com/ttk/" + businessName;
    var path4 = path3_replace + "/sb";
    var path4_replace = path3_replace + "/" + moduleName;


    var path2_service = path1_replace + "/tax-sb-service";
    var path2_service_replace = path1_replace + "/" + serviceName + "-service";
    var path3_service = path2_service_replace + "/src/main/java/com/ttk/tax";
    var path3_service_replace = path2_service_replace + "/src/main/java/com/ttk/" + businessName;
    var path4_service = path3_service_replace + "/sb";
    var path4_service_replace = path3_service_replace + "/" + moduleName;


    console.log("正在进行interfce包名替换。");

    //fs.renameSync(path1, path1_replace);
    fs.renameSync(path2, path2_replace);
    fs.renameSync(path3, path3_replace);
    fs.renameSync(path4, path4_replace);
    fs.renameSync(path4_replace + "/itf/ITaxDiscoveryService.java", path4_replace + "/itf/I" + BusinessName + "DiscoveryService.java");
    fs.renameSync(path4_replace + "/itf/ITaxHealthCheckService.java", path4_replace + "/itf/I" + BusinessName + "HealthCheckService.java");

    console.log("正在进行service包名替换。");
    fs.renameSync(path2_service, path2_service_replace);
    fs.renameSync(path3_service, path3_service_replace);
    fs.renameSync(path4_service, path4_service_replace);
    console.log("正在进行service类名替换。");
    fs.renameSync(path4_service_replace + "/impl/TaxDiscoveryServiceImpl.java", path4_service_replace + "/impl/" + BusinessName + "DiscoveryServiceImpl.java");
    fs.renameSync(path4_service_replace + "/impl/TaxHealthCheckServiceImpl.java", path4_service_replace + "/impl/" + BusinessName + "HealthCheckServiceImpl.java");

    console.log("微服务创建成功,位置："+path1_replace);
}



function callback() {

    replace({
        regex: "sb",
        replacement: moduleName,
        paths: [temppath + '/src/'+businessName+'/service/'],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "tax",
        replacement: businessName,
        paths: [temppath + '/src/'+businessName+'/service/'],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "Tax",
        replacement: BusinessName,
        paths: [temppath + '/src/'+businessName+'/service/'],
        recursive: true,
        silent: true,
    });

    //var path0 = temppath + "/src/tax/";
    var path0_replace = temppath + "/src/" + businessName;

    var path1 = path0_replace+"/service/tax-sb";
    var path1_replace = path0_replace+"/service/" + serviceName;
    var path2 = path1_replace + "/tax-sb-interface";
    var path2_replace = path1_replace + "/" + serviceName + "-interface";
    var path3 = path2_replace + "/src/main/java/com/ttk/tax";
    var path3_replace = path2_replace + "/src/main/java/com/ttk/" + businessName;
    var path4 = path3_replace + "/sb";
    var path4_replace = path3_replace + "/" + moduleName;


    var path2_service = path1_replace + "/tax-sb-service";
    var path2_service_replace = path1_replace + "/" + serviceName + "-service";
    var path3_service = path2_service_replace + "/src/main/java/com/ttk/tax";
    var path3_service_replace = path2_service_replace + "/src/main/java/com/ttk/" + businessName;
    var path4_service = path3_service_replace + "/sb";
    var path4_service_replace = path3_service_replace + "/" + moduleName;


    console.log("正在进行interfce包名替换。");

    fs.renameSync(path1, path1_replace);
    fs.renameSync(path2, path2_replace);
    fs.renameSync(path3, path3_replace);
    fs.renameSync(path4, path4_replace);
    fs.renameSync(path4_replace + "/itf/ITaxDiscoveryService.java", path4_replace + "/itf/I" + BusinessName + "DiscoveryService.java");
    fs.renameSync(path4_replace + "/itf/ITaxHealthCheckService.java", path4_replace + "/itf/I" + BusinessName + "HealthCheckService.java");

    console.log("正在进行service包名替换。");
    fs.renameSync(path2_service, path2_service_replace);
    fs.renameSync(path3_service, path3_service_replace);
    fs.renameSync(path4_service, path4_service_replace);
    console.log("正在进行service类名替换。");
    fs.renameSync(path4_service_replace + "/impl/TaxDiscoveryServiceImpl.java", path4_service_replace + "/impl/" + BusinessName + "DiscoveryServiceImpl.java");
    fs.renameSync(path4_service_replace + "/impl/TaxHealthCheckServiceImpl.java", path4_service_replace + "/impl/" + BusinessName + "HealthCheckServiceImpl.java");

    console.log("微服务创建成功,位置："+path1_replace);
}

