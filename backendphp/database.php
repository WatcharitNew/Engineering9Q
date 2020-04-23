<?php
    include_once 'config.php';

    class DB {
        private $host = DB_HOST;
        private $user = DB_USER;
        private $pass = DB_PASS;
        private $dbname = DB_NAME;

        private $myPDO;

        public function __construct() {
            $this->connectDB();
        }

        private function connectDB() {
            try {
                $this->myPDO = new PDO('mysql:host='.$this->host.';dbname='.$this->dbname, $this->user, $this->pass);
                }
            catch(PDOException $e)
                {
                echo "Connection failed: " . $e->getMessage();
                }
        }

        //INSERT
        public function insert($query) {
            $statement = $this->myPDO->prepare($query);
            $result = $statement->execute();
            //echo($query);
            //echo($result);
            if($result) return json_encode($result);
            return false;
        }

        //SELECT
        public function select($query) {
            $statement = $this->myPDO->prepare($query);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }

        //UPDATE
        public function update($query) {
            //echo($query."\r\n");
            $statement = $this->myPDO->prepare($query);
            $result = $statement->execute();
            return json_encode($result);
        }
    }
?>