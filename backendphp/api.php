<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
	header("Access-Control-Expose-Headers: access-control-allow-origin");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	header('Content-Type: text/html; charset=utf-8');
	include_once 'user.php';

	session_start();
	
	
	$user = new User();

	if($_POST['q'] == 'getUserByUserId')
	{
		$userId = $_POST['userId'];

		echo($user->getUser($userId,'',''));
	}
	else if($_POST['q'] == 'createNewUser')
	{
		$userId = $_POST['userId'];
		$name = $_POST['name'];
		$major = $_POST['major'];
		$scores = $_POST['scores'];
		$sumScore = $_POST['sumScore'];

		echo($user->createUser($userId,$name,$major,$scores,$sumScore));
	}
	else if($_POST['q'] == 'addComment')
	{
		$userId = $_POST['userId'];
		$helpStudy = '';
		$helpHealth = '';
		$helpOther = '';
		$worryText = '';
		if(array_key_exists('helpStudy',$_POST)) $helpStudy = $_POST['helpStudy'];
        if(array_key_exists('helpHealth',$_POST)) $helpHealth = $_POST['helpHealth'];
		if(array_key_exists('helpOther',$_POST)) $helpOther = $_POST['helpOther'];
		if(array_key_exists('worryText',$_POST)) $worryText = $_POST['worryText'];
		$isWantPsychologist = $_POST['isWantPsychologist'];

		echo($user->updateUser($userId,$helpStudy,$helpHealth,$helpOther,$worryText,$isWantPsychologist));
	}
	else if($_POST['q'] == 'getUserByFilter')
	{
		$major = '';
		$year = '';
		if(isset($_POST['major'])) $major = $_POST['major'];
		if(isset($_POST['year'])) $year = $_POST['year'];
		echo($user->getUser(-1,$major,$year));
	}
	else if($_POST['q'] == 'test')
	{
		echo('{"test":"test"}');
	}
?>