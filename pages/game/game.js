// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:40,
    lastTime:10,
    numbers:[1,2,3],
    mathLogic:['+','-'],
    result:'',
    rightResult:5
  },
  inputResult:function(e){

    var _this = this;
    var type = this.data.score / 10;
    var mathLogic = mathLogic(type);
    var input = e.currentTarget.dataset.input;

    checkInput(input);
    
    function checkInput(input){
      if('~' == input){
        _this.data.result = _this.data.rightResult;
        _this.data.score -= 2;
        checkResult();
      }else if('q' == input){
        checkResult();
      }else if('z' == input){
        _this.data.result = '';
      }else if('<' == input){
        var result = _this.data.result;
        _this.data.result = result.substr(0,result.length-1);
      }else{
        _this.data.result = _this.data.result + input;
      }
        _this.setData({result:_this.data.result,score:_this.data.score,rightResult:_this.data.rightResult});
    }

    function checkResult(){
      if(_this.data.result == _this.data.rightResult){
        _this.data.score += 1;
        _this.setData({result:''});
        createNewResult();
      }else{
        checkInput('~');
      }
    }

    function createNewResult(){
      var numbers = _this.data.numbers;
      var result;
      var rightResult;
      if(type <= 1){
        result = numbers[1];
        rightResult = numbers[2];
        _this.data.numbers.splice(0,1);
        for(var i = 1;i<numbers.length;i++){
          var mathType = Math.floor(Math.random() * 2 );
          mathType = 1;
          result = doMath(mathType,result,numbers[i]);
          if(i == numbers.length-1){
            rightResult = doMath(mathType,rightResult,result);
          }else{
            rightResult = doMath(mathType,rightResult,numbers[i+1]);
          }
        }
        _this.data.rightResult = rightResult;
        _this.data.numbers[numbers.length] = result;
        _this.setData({numbers:_this.data.numbers});
        return result;
      }
      if(numbers.length - 2 < type && type < 8){
        var mathType = Math.floor(Math.random() * 2);
        result = numbers[0];
        rightResult = numbers[1];
      }else{
        result = numbers[1];
        rightResult = numbers[2];
        _this.data.numbers.splice(0,1);
      }
      if(type <= 4){
        for(var i = 1; i< numbers.length ; i++){
          var mathType = Math.floor(Math.random() * 2);
          result = doMath(mathType,result,numbers[i])
          if(i == numbers.length -1){
            rightResult = doMath(mathType,rightResult,result);
          }else{
            rightResult = doMath(mathType,rightResult,numbers[i+1]);
          }
        }
      }else if(type <8 && type >4){
          var mathType1 = [0];
          var mathType2 = [0];
          var numbersTemp = [numbers[0]];
          for(var i = 1 ; i < numbers.length ;i++){
            mathType1[i] = Math.floor(Math.random() * 4);
            mathType2[i] = Math.floor(Math.random() * 4);
          }
          for(var i = 1 ; i< mathType1.length ; i++){
            if (mathType1[i] > 2) {
              numbersTemp[i] = doMath(mathType1[i], numbers[i - 1], numbers[i]);
              numbersTemp[i - 1] = 0;
              mathType1[i] = mathType1[i - 1];
            } else {
              numbersTemp[i] = numbers[i];
            }
          }
          for (var i = 1; i < numbersTemp.length ; i++){
            result = doMath(mathType1[i], result, numbersTemp[i]);
          }
          for (var i = 2; i <= mathType2.length; i++) {
            if (mathType2[i] > 2) {
              if(i == mathType2.length){
                numbersTemp[i] = doMath(mathType2[i], numbers[i - 1], result);
              }else{
                numbersTemp[i] = doMath(mathType2[i], numbers[i - 1], numbers[i]);
              }
              numbersTemp[i - 1] = 0;
              mathType2[i] = mathType2[i - 1];
            }else{
              if (i == mathType2.length - 1) {
                numbersTemp[i] = result;
              }else{
                numbersTemp[i] = numbers[i];
              }
            }
          }
        for (var i = 2; i < numbersTemp.length; i++) {
            rightResult = doMath(mathType2[i], rightResult, numbersTemp[i]);
          }
      }else if(type >= 8){
        result = numbers[1];
        rightResult = numbers[2];
        _this.data.numbers.splice(0,1);
        for(var i =1 ; i < numbers.length ; i++){
          var mathType = Math.floor(Maht.random() * 4); 
          result = doMath(mathType,result,numbers[i]);
          if (i == numbers.length - 1) {
            rightResult = doMath(mathType, rightResult, result);
          } else {
            rightResult = doMath(mathType, rightResult, numbers[i + 1]);
          }
        }
      }
      _this.data.rightResult = rightResult;
      _this.data.numbers[numbers.length] = result;
      _this.setData({numbers:_this.data.numbers});
    }

    function doMath(mathType,number1,number2){
      number1 = parseFloat(number1);
      number2 = parseFloat(number2);
      if(0 == mathType){
        return number1 + number2;
      }
      if(1 == mathType){
        return number1 - number2;
      }
      if(2 == mathType){
        return number1 * number2;
      }
      if(3 == mathType){
        return Math.floor(number1 / number2);
      }
    }

    function mathLogic(type){
      if(1 >= type){
        return ['+','-'];
      }else if(8 >= type){
        return ['+','-','x','/'];
      }else if(16 >= type){
        return['+','-','x','/','()'];
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})