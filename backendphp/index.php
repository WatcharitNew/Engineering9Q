<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Examples</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js" integrity="sha256-T/f7Sju1ZfNNfBh7skWn0idlCBcI3RwdLSS4/I7NQKQ=" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.3/qs.min.js" integrity="sha256-lSPkSu/D04IeqWOhTgTf5tLzNFEc37oNE9ysGS9PdK4=" crossorigin="anonymous"></script>
    </head>
    <body>
        <h2>Get Session</h2>
		<p>This below box will get you the session in php after pressing the button</p>
		<button id='getsess'>Click to get session values</button>
		<div id='getResult' style="width:200px;height:100px;border:1px solid black"></div>
		<hr/>
		<h2>Set Session</h2>
		<p>Fill a,b and click set session</p>
		<p>a</p>
		<input id='a' type='text' />
		<p>b</p>
		<input id='b' type='text' />
		<br />
		<button id='setsess'>Set session</button>
		<hr />
		<h2>Clear cookie</h2>
		<p>This also means clear session</p>
		<button id='clearsess'>Clear</button>
        <script>
            $(function () {
                $('#getsess').click(()=>{
					const requestBody = {
					  q: 'getSession',
					}

					const config = {
					  headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					  }
					}

					axios.post('test.php', Qs.stringify(requestBody), config)
					  .then((result) => {
						$('#getResult').text(JSON.stringify(result.data));
					  })
				});
				
				$('#setsess').click(()=>{
					const requestBody = {
					  q: 'setSession',
					  a: $('#a').val(),
					  b: $('#b').val(),
					}

					const config = {
					  headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					  }
					}

					axios.post('test.php', Qs.stringify(requestBody), config)
					  .then((result) => {
						alert('SET, now click get session again, try to refresh browser as well');
					  })
				});
				
				$('#clearsess').click(()=>{
					document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
					alert('Cleared, now get session data again!');
				});
            });
        </script>
    </body>
</html>
