<template>
  <div class="obstacle-stick"
    :style="style"
  >
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    thickness: Number,
    playerWidth: Number,
    moveSpeed: Number,
    move: {
      type: Object,
      default: ()=>{return {move: true}}
    }
  },
  data () {
    return {
      positionX: 0,
      moveInterval: null,
      notMid: true,
      notWarn: true,
    }
  },
  computed: {
    style () {
      return {
        width: `${this.width}%`,
        position: 'absolute',
        right: `${this.positionX-this.width}%`,
        bottom: `${this.height}px`,
        height:`${this.thickness}px`
      }
    }
  },
  methods:{
    destroy () {
      this.$emit('destroy')
      cancelAnimationFrame(this.moveInterval)
    },
    checkPosition () {
      this.moveInterval = requestAnimationFrame(this.checkPosition);
      if(!this.move.move) {
        cancelAnimationFrame(this.moveInterval)
      }
      this.positionX+=this.moveSpeed;
      if(this.positionX>=50 && this.notMid){
        this.$store.commit({
          type: 'addRange',
          start: this.height,
          end: this.height+this.thickness,
        })
        this.$emit('check');
        this.notMid = false;
      }else if(this.positionX>=50+this.width+this.playerWidth && this.notWarn){
        this.$store.commit({
          type: 'removeRange',
          start: this.height,
          end: this.height+this.thickness
        })
        this.notWarn = false
      }else if(this.positionX>100+this.width){
        this.destroy();
      }
    },
  },
  mounted () {
    this.moveInterval = requestAnimationFrame(this.checkPosition);
  },
  
  
}
</script>

<style scoped>
.obstacle-stick{
  background-color: #1268a1;
}
</style>