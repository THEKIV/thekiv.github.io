<?php
function getIp() {
$keys = [
'HTTP_CLIENT_IP',
'HTTP_X_FORWARDED_FOR',
'REMOTE_ADDR'
];
foreach ($keys as $key) {
if (!empty($_SERVER[$key])) {
$ip2 = trim(end(explode(',', $_SERVER[$key])));
if (filter_var($ip2, FILTER_VALIDATE_IP)) {
return $ip2;
}}}}
$ip2 = getIp();
echo "<!--My IP--><b>" .$ip2. "</b><!--My IP-->"
?>