var arr=new Array();

arr[0]="images/01.png";//��ͼƬ��ַ

arr[1]="images/02.png";



var num=0;

setInterval(turnpic,2000); //ÿ��2��ת��ͼƬ

 function turnpic(){

   idsrc=document.getElementById("right_img1");

   if(num==arr.length-1)

        num=0;

   else

        num+=1;

   idsrc.src=arr[num];

}