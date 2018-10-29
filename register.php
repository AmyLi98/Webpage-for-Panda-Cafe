<?php
/**
 * Created by PhpStorm.
 * User: Sunshine
 * Date: 2018/10/29
 * Time: 12:43
 */

/*配置数据库信息*/
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "web_user";

$handle = new mysqli($servername, $username, $password, $dbname);
//$handle = mysqli_connect(host, user, passwd, dbName);
if($handle->connect_error){
    die('连接数据库失败！'.$handle->connect_error);
}
echo "Connected successfully";

header('Content-type:text/html; charset=utf-8');
//$action = $_GET['action'];//获取get过来的action行为参数
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['user_name'];
    $age = $_POST['age'];
    $user_email = $_POST['user_email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];

    $_SESSION['userid'] = $username;
    $userid = $_SESSION['userid'];

    //trim()函数去除两边空白
    //stripcslashes()去除转义字符
    //htmlspecialchars()把一些预定义的字符转换为 HTML 实体
    //md5()数据摘要(习惯上称为加密，但是md5()实际上不是加密，而是摘要)
    $data['username'] = htmlspecialchars(stripcslashes(trim($username)));
    $data['password'] = htmlspecialchars(stripcslashes(trim($password)));
    $data['age'] = htmlspecialchars(stripcslashes(trim($age)));
    $data['user_email'] = htmlspecialchars(stripcslashes(trim($user_email)));
    $data['phone'] = htmlspecialchars(stripcslashes(trim($phone)));

    $sql = "insert into users(username,password,age,user_email,phone) values('%s','%s','%s','%s','%s')";
    $formatted = sprintf($sql, $data['username'], $data['password'], $data['age'], $data['user_email'], $data['phone']);
    echo '打印刚才执行的SQL语句：' . '<br>' . $formatted . '<br>';
    $result = mysqli_query($handle, $formatted);

    //echo $result ? $userid.'注册成功' : '注册失败';

    if(!$result){
        echo "<script>alert('注册失败！')</script>";
        echo "<script>window.location.href='index.html'</script>";
    }
    else{
        echo "<script>alert('$userid.注册成功！')</script>";
        echo "<script>window.location.href='index.html'</script>";
    }
}

?>