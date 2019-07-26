<template lang="pug">

  div(id="app")
    div(class="container")

      router-view

</template>

<style lang="stylus">
body
  margin 0
  font-family Arial
  font-size 14px
  color #999

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
    -webkit-appearance none

input[type='number']
    -moz-appearance textfield

.container
  margin 0 auto
  @media (min-width: 560px)
    max-width 960px
  @media screen and (max-width: 560px)
    max-width 560px

#app
  height 100vh
  display flex
  align-items center
  justify-content center

a
  color #ff0156
  text-decoration none

.pt-1
  padding 10px 0

.text-center
  text-align center

.form-row
  display flex

.form-control
  border 0
  padding 10px
  border-radius 5px
  transition .3s
  font-weight bold
  &::placeholder
    color #fff
  &:focus
    outline none
  &:disabled
    background-color transparent!important
    outline 2px dashed #ab293a
    outline-offset -2px

 .btn
  padding 10px 20px
  border none
  border-radius 20px
  background linear-gradient(135deg, rgba(255,0,92,1) 0%, rgba(255,13,31,1) 100%)
  color #fff
  font-size 16px
  text-transform uppercase
  width 100%
  cursor pointer
  &:focus
    outline none
</style>
