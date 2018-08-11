<?php
require_once ("conection.php");
$mysqli = db_connect ();

$sql = "call get_item_001('00001','00001','0',@exit_cd);";

$result = $mysqli -> query($sql);

print_r($result);

print_r($result ->fetch_assoc());

// 1秒ごとにクエリを発行

// 戻ってきたら進行

/*
$sql = "call get_item_001(?,?,?,@exit_cd);";

$stmt = $mysqli -> prepare($sql);

$stmt->bind_param("sss",$val1,$val2,$val3);

$val1 = "00001";
$val2 = "00001";
$val3 = "0";

$stmt -> execute();

$stmt -> bind_result($col1,$col2);

print_r($stmt->fetch());
        if($result = $mysqli -> query("SELECT @exit_cd AS exit_cd")){
            while ($row = $result->fetch_assoc()) {
                $data_array [] = $row;
            }
            // 結果セットを閉じる
            $result -> close();

            $ret_data = $data_array[0];

            if($ret_data["exit_cd"] != 0){
                return $ret_data["exit_cd"];
            }
        }else{
            $data_array = fetch_all($stmt);
            if(!$data_array){
                $ret_data = null;
            }else{
                $ret_data = $data_array;
            }
        }

        function fetch_all(& $stmt) {
        	$hits = array();
        	$params = array();
        	$meta = $stmt->result_metadata();
            print_r($meta);

        	while ($field = $meta->fetch_field()) {
        		$params[] = &$row[$field->name];
        	}
            print_r($field);
        	call_user_func_array(array($stmt, 'bind_result'), $params);
        	while ($stmt->fetch()) {
        		$c = array();
        		foreach($row as $key => $val) {
        			$c[$key] = $val;
        		}
        		$hits[] = $c;
        	}
        	return $hits;
        }

        */