<?php
    include_once 'database.php';

    class User {
        private $db;
        private $table = "USER";

        public function __construct() {
            $this->db = new DB();
        }

        public function getUser($userId,$major,$year) {
            $query = "select * from $this->table where ";
            if($userId != -1) $query .= "userId = '".$userId."'";
            else {
                if($major != '') $query .= "major like '".$major."' and ";
                if($year != '') $query .= "userId like '".$year."%' and ";
                $query .= '1';
            }
            return $this->db->select($query);
        }

        public function createUser($userId,$name,$major,$scores,$sumScore) {
            $query = 'INSERT INTO user (userId, name, major, scores, sumScore, createdTime, isWantPsychologist) VALUES (\''.$userId.'\',\''.$name.'\',\''.$major.'\',\''.$scores.'\','.$sumScore.',now(),0)';
            return $this->db->insert($query);
        }

        public function updateUser($userId,$helpStudy,$helpHealth,$helpOther,$worryText,$isWantPsychologist) {
            $query = 'UPDATE user SET ';
            if($helpStudy != '') $query .= 'helpStudy=\''.$helpStudy.'\',';
            if($helpHealth != '') $query .= 'helpHealth=\''.$helpHealth.'\',';
            if($helpOther != '') $query .= 'helpOther=\''.$helpOther.'\',';
            if($worryText != '') $query .= 'worryText=\''.$worryText.'\',';
            $query .= 'isWantPsychologist='.$isWantPsychologist.' WHERE userId=\''.$userId.'\'';
            return $this->db->update($query);
        }
    }
?>