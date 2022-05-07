const router = require("express").Router();
const auth = require("../middleware/auth");
// const { PythonShell } = require('python-shell');
// const path = require('path');
const axios = require('axios');
// const axiosRetry = require('axios-retry');
require("dotenv").config();

// axiosRetry(axios, {
//   retries: 10, // number of retries
//   retryDelay: (retryCount) => {
//     // console.log(`retry attempt: ${retryCount}`);
//     return retryCount * 2000; // time interval between retries
//   },
//   retryCondition: (error) => {
//     // if retry condition is not specified, by default idempotent requests are retried
//     return error.response.status === 503;
//   },
// });



function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  }
  else {
    console.log('dumpError :: argument is not an object');
  }
}

router.post("/robotlist", auth, async (req, res) => {
  try {
    let { email, password, mode } = req.body;
    const apiurl=process.env.FLASK_API+"/get_robots"
    console.log(apiurl)
    const headers = { headers: {"Content-type":"application/json"} }
    const data={
      email:email,
      password:password,
      mode:mode
    }
    
    const resp = await axios.post(
      apiurl,
      data,
      headers
    )
    
    if(resp.data.remoteSearchError.success==true){
      var robotListData = []
      var tmpHSR={
        "robotId":"t314163-g20z-31fb-a6f7-2402ac1e5468",
        
        "robotState":{"location":{"ip":"137.195.86.140","city":"Currie","region":"Scotland","country":"GB","postal":"EH14"}},
        "model":"Toyota HSR",
        "robotConfig":{"inputModalities":["vision","audio","laser","proprioception"],"outputModalities":["motor","arm","speech"]}
        
      }
      resp.data.robots.push(tmpHSR)
      for (var i=0; i<resp.data.robots.length; i++){
        var temp={
          "image":"",
          "robot_id":resp.data.robots[i].robotId,
          "robot_name":resp.data.robots[i].model,
          "ipAddress":resp.data.robots[i].robotState.location.ip,
          "location":resp.data.robots[i].robotState.location.city+", "+resp.data.robots[i].robotState.location.region+", "+resp.data.robots[i].robotState.location.country+", "+resp.data.robots[i].robotState.location.postal,
          "input_channels":resp.data.robots[i].robotConfig.inputModalities,
          "output_channels":resp.data.robots[i].robotConfig.outputModalities
        }
        if(temp["robot_name"].toLowerCase()=="pepper"){
          temp["image"]="https://res.cloudinary.com/djjea6fd7/image/upload/v1620563664/animus_robot/pepper_ysgedw.jpg"
        }
        else if(temp["robot_name"].toLowerCase()=="miroe"){
          temp["image"]="https://res.cloudinary.com/djjea6fd7/image/upload/v1620563664/animus_robot/miro_q8vbv6.jpg"
        }
        else if(temp["robot_name"].toLowerCase()=="nao"){
          temp["image"]="https://res.cloudinary.com/djjea6fd7/image/upload/v1620563664/animus_robot/nao_trgwbu.jpg"
        }
        else if(temp["robot_name"].toLowerCase()=="toyota hsr"){
          temp["image"]="https://res.cloudinary.com/decipher-tech/image/upload/v1623851457/HWU_Telecare/hsr_kqbkzh.jpg"
        }
        robotListData.push(temp)
      }
      res.json(robotListData)
    }
    else{
      throw new Error("Remote search error")
    }  
    

  } catch (err) {
    dumpError(err)
    res.status(500).json({ error: err.message });
  }
})
// router.post("/robotdata", auth, async(req,res)=>{
//     try {

//       let { toggleState, email, password } = req.body;

//       if(toggleState==true){
//         toggleState=1
//       }
//       else{
//         toggleState=0
//       }
//       // console.log(toggleState + email + password)
//       let options = {
//           mode: 'text',
//           pythonPath: process.env.PYTHON_PATH,
//           pythonOptions: ['-u'], // get print results in real-time 
//           scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
//           args: [toggleState, email, password] //An argument which can be accessed in the script using sys.argv[1] 
//       };
//       PythonShell.run('animus_datafeed.py', options, function (err, result) {
//         if (err) throw err;
//         console.log('result: ', result); 
//         res.send(result)
//     });
//       // PythonShell.on('animus_datafeed.py', options, function (err, result) {
//       //     if (err) throw err;
//       //     console.log('result: ', result); 
//       //     res.send(result)
//       // });
//     } catch (err) {
//         dumpError(err)
//         res.status(500).json({ error: err.message });
//     }
// })


module.exports = router;