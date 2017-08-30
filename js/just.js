'use strict';

var justapp = angular.module('marvel', []);

justapp.controller("quetionaryController", function($scope, $http) {
    $scope.marvel = [];
    $scope.userGiveUp = false;
    $scope.endPoints = true;
    $scope.heroPic = '';
    $scope.heroName = '';
    $scope.ButtonNext = '';
    $scope.finished = '';
    $scope.title_marvel = 'Welcome to Marvel Quiz';
    $scope.text_body_marvel = "let's test your knowledge in the Marvel universe and see how many points you can do, good luck ;-)"
    $scope.choiceColor = 'dark';
    $scope.userPoints = 0;
    $scope.choice = true;
    var x = 0;
    var count = 0;
    var publicKey = 'c65af5cea0a8039ef261b24a695d602c';
    var baseUrl = "http://gateway.marvel.com/v1/public/characters";
    var timeStamp = '17071991';
    var hash = '78a7d5bf7353ea721c6c693ada1fbfec';

    function getHero() {
        $http.get(baseUrl, {
            params: {
                ts: timeStamp,
                apikey: publicKey,
                hash: hash,
                limit: 50,
                series: '5, 22, 102, 99, 91, 47, 44, 160, 173'
                    /*On Series, I bring some heres based in the sequencial series*/
            }
        }).then(function(response) {
            console.log(response.data.data.results);
            $scope.marvel = response.data.data.results;
            $scope.loadHero();
        });
    }

    function clearName() {
        document.getElementById('userChoice').value = '';
    }

    $scope.loadHero = function(HeroChoice) {
        if (HeroChoice) {
            x += HeroChoice;
        }

        $scope.choiceColor = 'dark';

        if (x >= $scope.marvel.length) {
            $scope.endPoints = false;
            $scope.choiceColor = 'primary';
            $scope.finished = 'block-center'

            $scope.title_marvel = 'Good Job, Hero!'
            $scope.text_body_marvel = "We hope that you enjoyed our little quiz, if you did a low score, don't be frustrated, try again!"
        } else {
            $scope.heroPic = $scope.marvel[x].thumbnail.path + '.' + $scope.marvel[x].thumbnail.extension;
            $scope.heroName = $scope.marvel[x].name;

            $scope.userGiveUp = false;
            $scope.choice = true;
        }
    }

    $scope.tryAgain = function() {
        window.location.reload();
    }

    $scope.giveUp = function(wa) {
        $scope.userGiveUp = true;
        $scope.choice = false;
        $scope.userPoints--;

        if (x >= $scope.marvel.length - 1) {
            $scope.ButtonNext = "Come on, let's finish this!"
            $scope.choiceColor = 'primary';
        } else if (!wa) {
            $scope.ButtonNext = "Ok, Don't worry, you can try the next hero"
            $scope.choiceColor = 'primary';
        } else if (wa) {
            $scope.ButtonNext = "Oh Nooo, Wrong answer, Let's try the next hero"
            $scope.choiceColor = 'danger';
        }
    }

    $scope.sendAnswer = function() {
        var HerosName = document.getElementById('userChoice').value;

        if ($scope.marvel[x].name.indexOf('(') != '-1') {
            var nomeMarvel = $scope.marvel[x].name.substring(0, $scope.marvel[x].name.indexOf('(') - 1);
        } else {
            var nomeMarvel = $scope.marvel[x].name;
        }

        if (nomeMarvel.toLowerCase() == HerosName.toLowerCase()) {
            //When correct show the name of the hero  
            $scope.userGiveUp = true;
            //Hide the buttons to avoid try insert a new answer on the same hero
            $scope.choice = false;
            //Add the point of correct answer
            $scope.userPoints++;
            //Change the color of the button
            $scope.choiceColor = 'success';
            //Show to user, that's the answer is correct
            if (x >= $scope.marvel.length - 1) {
                $scope.ButtonNext = "Come on, let's finish this!"
            } else {
                $scope.ButtonNext = "Nice job, Let's to the next hero";
            }
            //Clear the input
            clearName();
        } else {
            $scope.giveUp('wrong');
            clearName();
        }
    }

    getHero();

});