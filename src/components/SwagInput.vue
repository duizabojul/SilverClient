<template>
  <div class="field" v-bind:id="fieldId">
    <div class="field__input-wrapper">
      <span v-if="type === 'password'" class="icon icon-lock"></span>
       <span v-if="isEmail" class="icon icon-envelope"></span>
      <label class="field__label">{{labelComputed}}</label>
      <input ref="input" :isEmail="isEmail" v-on="inputListeners" :style="{'font-size' : fontSize}" :type="type" autocomplete="nope" class="field__input" :placeholder="placeholder" :id="id">
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {

      id: String,
      placeholder: String,
      label: String,
      type: {
        type : String,
        default : 'text'
       },
      value: [String, Number],
      fontSize :{
        type : String,
        default : '16px'
      },
      isEmail: {
        type : Boolean,
        default : false
       },
    },
    mounted:function(){
      var vm = this
      this.input = document.getElementById(this.id)
        this.input.addEventListener('focus', () => {
          this.input.closest('.field').classList.add('field--active')
        })
        this.input.addEventListener('blur', () => {
          this.input.closest('.field').classList.remove('field--active')
        })
        const changeEvents = ['input', 'keyup', 'paste', 'change' ,'focus', 'blur', 'keydown']
        changeEvents.forEach(event => {
          this.input.addEventListener(event, () => {
          if (this.input.value.length != 0) {
            this.input.closest('.field').classList.add('field--show-floating-label')
          } else {
            this.input.closest('.field').classList.remove('field--show-floating-label')
          }
        })
      })
    
      
    },
    data() {
      return {
        input : <any> null
      }
    },
    watch: {
      value : function(newValue) {
        this.input.value = newValue
        if (this.input.value.length != 0) {
            this.input.closest('.field').classList.add('field--show-floating-label')
          } else {
            this.input.closest('.field').classList.remove('field--show-floating-label')
          }
      }
    },
    computed: {
      inputListeners: function () {
        var vm = this
        return Object.assign({},
          this.$listeners,
          {
            input: function (event:any) {
              vm.$emit('input', event.target.value)
            }
          }
        )
      },
      fieldId : function() {
        return `${this.id}-field`
      },
      labelComputed : function() {
        return this.label || this.placeholder
      } 
    },
    methods: {
    }
  });
</script>

<style>

  .field {
  width: 100%;
  padding : 7px 0;
  position: relative;
}

.field__input-wrapper--select::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.field__input-wrapper {
  position: relative;
}
.field--show-floating-label .field__input {
  padding-top: 21px;
  padding-bottom: 9px;
}
.field--show-floating-label .field__label {
  -webkit-transform: translateY(3px) !important;
  transform: translateY(3px) !important;
  opacity: 1 !important;
}
.field__label {
  margin: 10px 5px;
  display: block;
  font-size: 10px;
  position: absolute;
  top: 0;
  pointer-events : none;
  width: 100%;
  margin-top: 1px;
  z-index: 1;
  padding: 0 10px;
  color: #797979;
  line-height: 14px;
  text-align: left;
  -webkit-transform: translateY(6px) !important;
  transform: translateY(10px) !important;
  opacity: 0 !important;
  -webkit-transition: all .2s cubic-bezier(0.22, 0.61, 0.36, 1)  !important;
  transition: all .2s cubic-bezier(0.22, 0.61, 0.36, 1)  !important;
}

.field__input {
  border-radius: 0;
  display: block;
  width: 100%;
  padding: 15px;
  color: inherit;
  font: inherit;
  margin: 0;
  font-size: 14px;
  font-weight : 400;
  -webkit-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f7f9fb;
  line-height: normal;
  border: 1px solid #dae0e2;
  -webkit-transition: all .2s cubic-bezier(.22,.61,.36,1)!important;
  transition: all .2s cubic-bezier(.22,.61,.36,1)!important;
  border-radius: 3px;
}

.field__input[type="password"], .field__input[isEmail="true"] {
  padding-left : 47px
}

.no-border .field__input {
    border: 1px solid transparent;
}
.field .field--active .field__input {
  background: red;
  -webkit-transition: opacity 0s !important;
  transition: opacity 0s !important;
}
.field.field--active .field__input-wrapper:not(.field__input-wrapper--select) .field__input {
  border-color: #00b7dc;
  background : white;
  outline: none
}
.field.field--active.no-border .field__input-wrapper:not(.field__input-wrapper--select) .field__input {
  border : 1px solid;
  background : #f7f9fb;
  border-color: #00b7dc;
  outline: none
}

  .icon {
        position: absolute;
        font-size: 20px;
    left: 15px;
    top: calc(50% - 1px);
    transform: translateY(-50%);
    opacity: .7;
    -webkit-transition: all .2s cubic-bezier(.22,.61,.36,1)!important;
  transition: all .2s cubic-bezier(.22,.61,.36,1)!important;
  }

    .field.field--show-floating-label .icon {
    top: calc(50% + 5px);
  }
</style>