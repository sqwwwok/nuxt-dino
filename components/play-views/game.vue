<template>
  <div class="dino-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Mario from '~/assets/images/play/Mario.png'
// 图像移动的速度
var speed = 1; 
 // mario原图的宽高之比
const ORIGIN_RATE = 0.75; 
// mario相对于canvas的height的缩放比例
const MARIO_SCALE_RATE = 0.08,   
// 初始位置mario左上角的x,y坐标
MARIO_X = 0.32, 
MARIO_Y = 0.8, 
// 障碍物左上角的y坐标范围 
BARRIER_RANGE = [0.2, 0.8],
// 障碍物的
BARRIER_WIDTH = [0.01,0.09],
BARRIER_INSTANCE = [];
export default {
  props: {
    "isRunning": Boolean
  },
  data(){
    return {
      width: 0,
      height: 0,
      context: {},
      animationControl: {
        displacement: 0
      }
    }
  },
  mounted(){
    this.initCanvas();
    window.onresize = () => {
      this.initCanvas();
    }
  },
  methods: {
    initCanvas(){
      var canvas = this.$refs.canvas;
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;
      this.context = canvas.getContext('2d');
      var marioImage = new Image();
      marioImage.src = Mario;
      marioImage.onload = ()=>{
        this.drawBaseLine();
        this.drawBaseMario(marioImage);
      }
    },
    drawBaseLine(){
      var {context,width,height} = this.$data;
      var positionY = (MARIO_Y+MARIO_SCALE_RATE)*height;
      context.beginPath();
      context.moveTo(0, positionY);
      context.lineTo(width, positionY);
      context.stroke();
    },
    drawBaseMario(image){
      var {context,width,height} = this.$data;
      context.drawImage(
        image, 
        MARIO_X*width,
        MARIO_Y*height,
        ORIGIN_RATE*MARIO_SCALE_RATE*height,
        MARIO_SCALE_RATE*height
      );
    },
    moveMario(){
      var {context, width, height, animationControl} = this.$data;
      context.clearRect(0,0,width,height);
      context.save();
      this.drawBaseLine();
      context.translate(0,-0.01*(++animationControl.displacement)*height);
      this.drawBaseMario();
      context.restore();
      requestAnimationFrame(this.moveMario.bind(this));
    }
  },
}
</script>

<style scoped>
.dino-container{
  overflow: hidden;
}
</style>