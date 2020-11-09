module.exports = app => {

    const personal = require("../controller/personal.js");

    app.get("/Personal/:pid",personal.PersonalPid);    
    app.get("/Timecard/:pid/:bulan/:tahun", personal.timecard);
    // app.delete("/person/:pid", personal.delete);
    // app.put("/person/:pid",personal.update);    
    // app.post("/person", personal.create);
    // app.delete("/person", personal.deleteAll);
    // app.post("/staf/:pid", personal.logon);
    // app.post("/sta/:pid", personal.logon2);
    // app.get("/staf3/:pid/:kerja", personal.logon3);
};