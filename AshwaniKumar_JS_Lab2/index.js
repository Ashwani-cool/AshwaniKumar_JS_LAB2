function Answer(answerText){
	this.answerText = answerText;
}
function Question(questionNumber,questionText,answerChoice,rightAnswer){
	this.questionNumber = questionNumber;
	this.questionText = questionText;
	this.answerChoice = answerChoice;
	this.rightAnswer = rightAnswer;
	this.isUserAnswerCorrect = function(userSelectedAnswer){
		if(rightAnswer.answerText == userSelectedAnswer){
			return true;
		} else{
			return false;
		}
	}
}

const answerFunctn = new Answer("Functions");
const answerXHTML = new Answer("XHTML");
const answerCSS = new Answer("CSS");
const answerHTML = new Answer("HTML");
const question1 = new Question(1,"Javascript supports",
	[answerFunctn,answerXHTML,answerCSS,answerHTML],answerFunctn);


const answerJQuery = new Answer("JQuery")
const answerXML = new Answer("XML");
const question2 = new Question(2, "Which language is used for styling web pages?", [answerHTML, answerJQuery, answerCSS, answerXML], answerCSS)


const answerPythonScript = new Answer("Python Script");
const answerDjango = new Answer("Django");
const answerNodeJS = new Answer("Node JS");
const question3 = new Question(3, "Which is not a Javascript framework?", [answerPythonScript, answerJQuery, answerDjango, answerNodeJS], answerPythonScript);


const answerPHP = new Answer("PHP");
const answerJS = new Answer("JS");
const answerAll = new Answer("All");
const question4 = new Question(4, "Which is used to connect to Database?", [answerPHP, answerHTML, answerJS, answerAll], answerPHP);


const answerLanguage = new Answer("Language");
const answerProgrammingLanguage = new Answer("Programming Language");
const answerDevelopment = new Answer("Development");
const question5 = new Question(5, "Java Script is a ", [answerLanguage, answerProgrammingLanguage, answerDevelopment, answerAll], answerProgrammingLanguage)

function QuizResult(questionAnswerObj){
	this.questionAnswerObj = questionAnswerObj;
	this.score = 0;
	this.getScore = function(){
		return this.score;
	}
	this.increementScore = function(){
		this.score++;
	}
	this.calculatePrecentage = function(){
		const percentage = (this.score/this.questionAnswerObj.length)*100;
		return percentage;
	}
}

function QuizApplication(questionAnswerObj){
	this.questionAnswerObj = questionAnswerObj;
	this.quizResult = new QuizResult(questionAnswerObj);
	this.pageIndex = 0;
	this.isLastQuestionAnswerPair = function(){
		if(this.pageIndex == (this.questionAnswerObj.length - 1)){
			return true;
		} else{
			return false;
		}
	}
	this.load = function(){
		this.attachListeners();
		this.displayQuizPage();
	}
	this.attachListeners = function(){
		const qaPairObj = this.questionAnswerObj[this.pageIndex];
		const answerChoices = qaPairObj.answerChoice;
		for(let index = 0; index < answerChoices.length; index++){
			const buttonID = "btn" + index;
			const answerChoicebtn = document.getElementById(buttonID);
			const currentQuizAppObj = this;
			this.addEventListener(answerChoicebtn,currentQuizAppObj);
		}
	}
	this.addEventListener = function(answerChoicebtn,currentQuizAppObj){
		answerChoicebtn.onclick = function(event){
			const target = event.currentTarget;
			const userSelectedAnswer = target.children[0].innerHTML;
			const qaPairObj = currentQuizAppObj.questionAnswerObj[currentQuizAppObj.pageIndex];
			const outcome = qaPairObj.isUserAnswerCorrect(userSelectedAnswer);
			if(outcome){
				currentQuizAppObj.quizResult.increementScore();
			} else{
				//do nothing
			}
			currentQuizAppObj.next();
		}
	}
	this.next = function(){
		if(this.isLastQuestionAnswerPair()){
			this.displayResultPage();
		} else{
			this.displayNextPage();
		}
	}
	this.displayNextPage = function(){
		this.pageIndex++;
		this.attachListeners();
		this.displayQuizPage();
	}
	this.displayResultPage = function(){
		const quizElement = document.getElementById("quiz");
		const content = 
		`<h1>Result<h1>
		<h2 id="score">Your Score: ${this.quizResult.getScore()}. percentage is ${this.quizResult.calculatePrecentage()}<h2>`;
		quizElement.innerHTML = content;
	}
	this.displayQuizPage = function(){
		this.displayQASection();
		this.displayProgressSection();
	}
	this.displayQASection = function(){
		const qaPairObj = this.questionAnswerObj[this.pageIndex];
		const questionElement = document.getElementById("question");
		questionElement.innerText = qaPairObj.questionText;
		const answerChoices = qaPairObj.answerChoice;
		for(let index = 0; index < answerChoices.length; index++){
			const ansChoiceObj = answerChoices[index];
			const identifier = "choice" + index;
			const ansChoiceElement = document.getElementById(identifier);
			ansChoiceElement.innerText = ansChoiceObj.answerText;
		}
	}
	this.displayProgressSection = function(){
		const progressElement = document.getElementById("progress");
		const qaPairObj = this.questionAnswerObj[this.pageIndex];
		const progressText = `Question ${qaPairObj.questionNumber} of ${questionAnswerObj.length}`;
		progressElement.innerText = progressText;
	}
}
const javascriptQuizApp = new QuizApplication([question1,question2,question3,question4,question5])
javascriptQuizApp.load();