function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('การเข้าแถว')
  var names = ss.getRange(1, 2,1,ss.getLastColumn()).getValues()[0]
  var check = ss.getRange(ss.getLastRow(), 2,1,ss.getLastColumn()).getValues()[0]
  var std = names.length-1
  var date = Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/')
  var year = Number(Utilities.formatDate(new Date(), 'GMT+7', 'yyyy'))+543
  
  var index =1
  var countNo = check.filter(x=> x == "ลา" || x == "ขาด").length
  var countLate = check.filter(x=> x == "สาย").length
  var countCheck = std-countNo
  var result = ""
  check.forEach((row,i)=>{
                if(row == "สาย" || row == "ขาด" || row == "ลา"){
    result+= "\n"+ (index++)+ ")" +names[i]+": "+row

  }

    })
    var msg = "ห้อง 6/1 🔹ประจำวันที่ "+date+year+"\n นักเรียนทั้งหมด "+std+" คน \n ✅มาเรียน "+countCheck+" คน \n 🕗มาสาย "+countLate+ " คน\n ❌ไม่มาเรียน "+countNo +" คน \n 📊รายชื่อนักเรียน(สาย,ขาด,ลา) ได้แก่ \n"+result
    sendNotify(msg)
    
}  
var token ="1sf0A718DZJ3Cxy7lXoI5fO9dzkL0YapN4XiPR1ZIHy"//โทเคน
function sendNotify(msg){
let payloadJson = {
       "message": msg
    };

    let options = {
        "method": "post",
        "payload": payloadJson,
        "headers": {
            "Authorization": "Bearer " + token
        }
    };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify"
, options);
}
