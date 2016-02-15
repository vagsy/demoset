var arr=new Array();

arr[0]="images/01.png";//·ÅÍ¼Æ¬µØÖ·

arr[1]="images/02.png";



var num=0;

setInterval(turnpic,2000); //Ã¿¸ô2Ãë×ª»»Í¼Æ¬

 function turnpic(){

   idsrc=document.getElementById("right_img1");

   if(num==arr.length-1)

        num=0;

   else

        num+=1;

   idsrc.src=arr[num];

}