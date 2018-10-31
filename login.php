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

if($handle->connect_error){
    die('Unable to connect to the database!'.$handle->connect_error);
}
echo "Connected successfully";

header('Content-type:text/html; charset=utf-8');

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['login_user_name'];
    $password = $_POST['login_password'];

    //echo "$username";
    $_SESSION['userid'] = $username;
    $userid = $_SESSION['userid'];

    $data['username'] = htmlspecialchars(stripcslashes(trim($username)));
    $data['password'] = htmlspecialchars(stripcslashes(trim($password)));

    $sql = "select username,password from users where username='%s'";
    $formatted = sprintf($sql, $data['username']);
    echo "Print the SQL statement just executed:". "<br>" . $formatted . "<br>";
    $result = mysqli_query($handle, $formatted);
    $res = mysqli_fetch_assoc($result);

    if(!$res){
        echo "<script>alert('No user!')</script>";
        echo "<script>window.location.href='index.html'</script>";
    }
// 此处应注意的是数据库的密码是摘要后的，无法还原的
// 所以我们对比密码的方法就是把提交过来的密码也进行摘要
// 然后两个密码做对比，相同的话登录到首页
    elseif ($data['password'] == $res['password']) {
        // 核对用户名和密码无误后登录到首页
        echo "<script>alert('Welcome $userid! Login successful!')</script>";
        echo "<script>window.location.href='index.html'</script>";
    }else{
        echo "<script>alert('Wrong password!')</script>";
        echo "<script>window.location.href='index.html'</script>";
    }
}

?>