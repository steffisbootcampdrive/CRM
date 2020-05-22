$(document).ready(() => {
  $("#ready").on("click", () => {
    $.get("/token", (data) => {
      console.log(data);
      Twilio.Device.setup(data);
      Twilio.Device.ready(function (device) {
        console.log("Twilio.Device Ready!");
        $("#logMsg").text("");
        $("#hangup").hide();
        $("#call").show();
        $(".modal").show();
        // $("#call_controls").css("display", "block");
      });

      Twilio.Device.error(function (error) {
        console.log("Twilio.Device Error: " + error.message);
        Twilio.Device.destroy();
        $(".modal").hide();
      });
      Twilio.Device.connect(function (conn) {
        console.log("Successfully established call!");
        $("#logMsg").text("Calling 5045154776......");
        $("#call").hide();
        $("#hangup").show();
      });

      Twilio.Device.disconnect(function (conn) {
        $("#logMsg").text("Call Ended");
        $("#call").show();
        $("#hangup").hide();
      });
    });
  });

  $("#call").on("click", () => {
    // var params = {
    //   To: $("#phoneNumber").val().trim(),
    // };
    // console.log("Calling " + params.To + "...");
    // Twilio.Device.connect(params);
    Twilio.Device.connect({ To: 5045154776 });
  });

  $("#hangup").on("click", () => {
    console.log("hangup!!!");
    Twilio.Device.disconnectAll();
  });
});
