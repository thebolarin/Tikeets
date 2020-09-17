exports.message = (user,event) => {
  const html = `<table width="100%" max-width="500px"style="padding: 0 40px 0 40px; background-color:#ffffff; margin: 50px auto;">
  <tr>
    <td align="center" style="background-color:#ffffff; margin: 0 50px 0 50px;">
      <a><img src="https://static.dribbble.com/users/1769954/screenshots/4985298/artboard_1.png" alt="Logo" width="120" height="100" style="display: block;"></a>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 0 30px 0 30px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%"
        style="background-color:#ffffff; padding: 0 0 0 20px; margin: 5px auto;">
        <tr>
          <td align="center" style="font-family:sans-serif; font-size: 28px; color: #050505;">
            <p>Hello ${user.name},</p>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="color: #153643; font-family: sans-serif; font-size: 16px; line-height: 20px; letter-spacing: normal;">
            <p>You have successfully reserved a  ticket for <b>${event.title}</b>  which is scheduled for <b>${event.date}</b>  by exactly <b>${event.time}</b></p>
          </td>
        </tr>
        <tr>
          <td align="center" style="text-align: center;">
            <a style="width:250px; display:inline-block; text-decoration: none; font-size: 18px; text-align:center;
      background-color:#55acee; border-radius:5px; color:white; height:32px; cursor: pointer; margin: 30px auto; padding-top:9px;"
              href="https://tikeet.herokuapp.com/">
              Visit Tikeets 
            </a>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="color: #153643; font-family:sans-serif; font-size: 16px; line-height: 20px;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 30px 30px 30px 30px; margin: 100px;">
      Tickeet,&copy; 2020<br />
    </td>
  </tr>
</table>
  `;
  return html;
};
