<?php
/**
 * Created by PhpStorm.
 * User: leow
 * Date: 12/24/15
 * Time: 6:45 PM
 */

// Used only for standalone debugging?
// Production use Nginx rewrite; passing on URI and parameters unchanged ..
if (file_exists($_SERVER["DOCUMENT_ROOT"] . $_SERVER["REQUEST_URI"])) {
    return false;
} else {
    echo "DOC_ROOT " . $_SERVER['DOCUMENT_ROOT'];
    echo 'URI is ' . $_SERVER['REQUEST_URI'] . "<br/>";
    require "public/index.php";
}
