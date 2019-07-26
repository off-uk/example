<template lang="pug">

  .card-group

    .card-front

      .card-logos
        img.card-logos__item.min(src="../assets/visa-logo-white.png" alt="Visa")
        img.card-logos__item(src="../assets/mastercard-logo-white.png" alt="MasterCard")
        img.card-logos__item(src="../assets/mastercard-logo-white.png" alt="Maestro")

      .card-front__group
        label.card-label(v-bind:class="{ 'card-front__error': isError }" for="cc-number") Номер карты
          span(v-show="isError") * Неверный номер карты
        .card-num(v-bind:class="{ 'card-num__error': isError}")
          input#cc-number.card-num__part.form-control(
            type='text' maxlength='4' @keydown="navigate" @keyup="next" @input="checkSymbols" required
            :disabled="getStatus == 'success' || getStatus == 'error'")

          input.card-num__part.form-control(
            type='text' maxlength='4' @keydown="navigate" @keyup="next" @input="checkSymbols" required
            :disabled="getStatus == 'success' || getStatus == 'error'")

          input.card-num__part.form-control(
            type='text' maxlength='4' @keydown="navigate" @keyup="next" @input="checkSymbols" required
            :disabled="getStatus == 'success' || getStatus == 'error'")

          input.card-num__part.form-control(
            type='text' maxlength='4' @keydown="navigate" @keyup="next" @input="checkSymbols" required
            :disabled="getStatus == 'success' || getStatus == 'error'")

      .card-front__group_justify_between.card-front__group
        .card-holder
          label.card-label(for="cc-name" autocomplete="cc-name") Имя на карте
          input#cc-name.card-holder__part.form-control(
            type='text' maxlength='100' :value="getCardInfo.holder" @input="updateHolder" required
            :disabled="getStatus == 'success' || getStatus == 'error'")

        .card-exp
          label.card-label.card-label_align_right(for="cc-exp") Срок действия
          .card-exp__group
            input#cc-exp.card-exp__part.form-control(
              type='text' maxlength='2'
              @input="updateExpDateMonth"
              :disabled="getStatus == 'success' || getStatus == 'error'" required)
            span.card-exp__separator /
            input.card-exp__part.form-control(
              type='text' maxlength='4'
              @input="updateExpDateYear"
              :disabled="getStatus == 'success' || getStatus == 'error'" required)

    .card-back
      .card-back__magnet
      .card-back__cvc
        label.card-label(for="cc-csc") CVV/CVC
        input#cc-csc.card-back__cvc-input.form-control(
          maxlength='4' autocomplete="cc-csc" :value="getCardInfo.cvc" @input="updateCvc" required
          :disabled="getStatus == 'success' || getStatus == 'error'")

</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: 'Card',
  props: {
    msg: String
  },
  data() {
    return {
      isError: false
    }
  },
  computed: mapGetters(['getCardInfo', 'getStatus']),
  methods: {
    updateHolder(e) {
      this.$store.commit('updateHolder', e.target.value)
    },
    updateCvc(e) {
      this.checkSymbols(e)
      this.$store.commit('updateCvc', e.target.value)
    },
    updateExpDateMonth(e) {
      this.checkSymbols(e)
      this.$store.commit('updateExpDateMonth', e.target.value)
    },
    updateExpDateYear(e) {
      this.checkSymbols(e)
      this.$store.commit('updateExpDateYear', e.target.value)
    },
    checkSymbols(e) {
      // To allow only numbers in text fields
      e.target.value = e.target.value.replace(/[^0-9.]/g, ''); 
      e.target.value = e.target.value.replace(/(\..*)\./g, '$1');
    },
    navigate(e) {
      if (e.key == "Backspace" && e.target.value.length == 0 && e.target.previousElementSibling) {
        e.target.previousElementSibling.focus()
      } else if (e.key == "Backspace") {
        this.isError = false
      } else if (e.target.nextElementSibling && e.target.value.length == e.target.maxLength) {
        e.target.nextElementSibling.focus()
      }
    },
    next(e) {
      const current = e.target;

      // For example: 4561261212345467 == true
      let number = '';

      let i = 0;
      for (i; i <= 3; i++) {
        number += e.target.parentElement.children[i].value;
      }
      
      if (!current.nextElementSibling && current.value.length == current.maxLength) {
        
        if (this.luhnAlgorithm(number)) {

          this.$store.dispatch('changeCardValues', {
            number: number
          })
          console.log(this.$store.state.card.number)

        } else {
          // alert(`Number is not valid ${number}`)
          this.isError = true
        }
      } 

    },
    luhnAlgorithm(digits) {
      let sum = 0;

      for (let i = 0; i < digits.length; i++) {
        let cardNum = parseInt(digits[i]);

        if ((digits.length - i) % 2 === 0) {
          cardNum = cardNum * 2;

          if (cardNum > 9) {
            cardNum = cardNum - 9;
          }
        }

        sum += cardNum;
      }

      console.log(sum % 10 === 0)

      return sum % 10 === 0;
    }
  }
}
</script>

<style lang="stylus">
$height = 250px
$indent-step = floor($height * 4% / 100%)
$card-padding = floor($indent-step * 2)

$card-height = floor($height - ($card-padding * 2))
$card-width = floor($card-height * 1.8)

.card
  &-group
    color #fff
    .form-control
      color: #f6d5da
    position relative
    width floor($card-width + $card-padding * 3)
    height floor($card-height + $card-padding * 6)
    @media screen and (max-width: 560px)
      width floor(($card-width + $card-padding * 3) / 1.3 - 40px)
      height floor(($card-height + $card-padding * 6))

  &-front, 
  &-back
    position absolute
    width $card-width
    height $card-height
    padding $card-padding
    border-radius 20px
    box-shadow 0px 0px 10px 0px rgba(0, 0, 0, 0.5)
    @media screen and (max-width: 560px)
      width floor($card-width / 1.3 - 40px)
      height floor($card-height)
  
  // Labels
  &-label
    display block
    text-transform uppercase
    margin-bottom 10px
    &_align_right
      text-align right
    @media screen and (max-width: 560px)
      font-size 12px
  
  // Card Front Side
  &-front
    display flex
    flex-direction column
    justify-content space-between
    background linear-gradient(135deg, rgba(255,0,92,1) 0%, rgba(255,13,31,1) 100%)
    z-index 2
    .form-control
      background-color #a2173a

    &__error
      display flex
      justify-content space-between
      align-items center
      span
        text-transform none
        font-weight 600
        font-size 12px

    &__group
      &_justify_between
        display flex
        justify-content space-between

  // Payment Companies Area
  &-logos
    display flex
    align-items center
    justify-content flex-end
    &__item
      height 30px
      padding 0 5px
      &.min
        height 20px

  // Card Number
  &-num
    display flex
    &__error
      .form-control
        background-color #c50032
    &__part
      width 25%
      margin 0 $indent-step
      text-align center
      padding 12px 10px
      letter-spacing 5px
      &:first-child
        margin-left 0
      &:last-child
        margin-right 0
      @media screen and (max-width: 560px)
        margin 0 floor($indent-step / 2)
        letter-spacing normal
  
  // Card Holder
  &-holder
    width 100%
    margin-right 20px
    &__part
      text-transform uppercase
      letter-spacing 3px
      width calc(100% - 20px)

  // Card Exp Date
  &-exp
    &__group
      display flex
      justify-content space-between
      align-items center
    &__separator
      font-size 20px
      color #fff
    &__part
      width 40px
      &:first-child
        margin-right 5px
      &:last-child
        margin-left 5px

  // Card Back Side
  &-back
    background: linear-gradient(135deg, rgba(186,184,184,1) 0%, rgba(150,149,149,1) 100%)
    left 20px
    top 80px
    z-index 1
    .form-control
      background-color #76595a
    &__magnet
      position absolute
      width 100%
      background-color #2b2b2b
      height 50px
      top 20%
      left 0
    &__cvc
      display flex
      align-items center
      position absolute
      bottom 20px
      right 40px
      .card-label
        margin 0
        margin-right 10px
      &-input
        width 40px
    @media screen and (max-width: 560px)
      left 0

</style>
