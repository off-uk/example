<template lang="pug">
  form(class="form-payment" @submit="submit()")
    Card.form-payment__item

    // Process
    .amount.form-payment__item(v-if="getStatus == 'process'")

      input.amount__input.form-control(
        type="number"
        maxlength="5"
        :value="getAmount"
        @input="updateAmount"
        placeholder="Сумма платежа"
        required)

      .form-payment__message
        .amount__total-section
            .amount__total-item Комиссия:
            .amount__total-item {{showCommission()}} тг.
        .amount__total-section
            .amount__total-item Итоговая сумма
            .amount__total-item {{showTotalAmount()}} тг.
      button.btn(type="submit") Оплатить
      .text-center.pt-1
        input(type="checkbox" required)
        label Я ознакомлпен и присоединяюсь <a href="#">к договору</a>
      p.text-center Комиссия может быть удержана банком эмитентом карты отправителя

    // Error
    .form-payment__item(v-else-if="getStatus == 'error'")
      .form-payment__message
        h2.form-payment__head Ошибка платежа
        p.form-payment__info Попробуйте еще раз
      button.btn(@click.prevent="repeat()") Повторить

    // Success
    .form-payment__item(v-else-if="getStatus == 'success'")
      .form-payment__message
        h2.form-payment__head Перевод совершен
        p.form-payment__info
          | Отправитель
          br 
          | Имя: {{getCardInfo.holder}}
          br
          | Номер карты: {{getCardInfo.number}}
          br
          | Годна до: {{getCardInfo.expDate.month + ' / ' + getCardInfo.expDate.year}}
          br
          | Сумма: {{showTotalAmount()}}
          br
          | Комиссия: {{showCommission()}}
          
      button.btn(@click.prevent="repeat()") Ок
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: 'card',
  components: {
    Card
  },
  computed: mapGetters(['getAmount', 'getCommission', 'getTotalAmount', 'getCardInfo', 'getStatus']),
  methods: {
    ...mapActions(['updateCommission', 'updateTotalAmount', 'submit', 'repeat']),
    updateAmount(e) {
      this.$store.commit('updateAmount', +e.target.value);
      this.$store.commit('updateTotalAmount', +e.target.value + this.getCommission);
    },
    showCommission() {
      return this.getCommission
    },
    showTotalAmount() {
      return (!this.getAmount) ? this.getCommission : this.getTotalAmount
    }
  }
}
</script>

<style lang="stylus">
.form-payment
  display flex
  align-items center
  justify-content center
  &__item
    margin 20px
    &:last-child
      width 250px
  @media screen and (max-width: 900px)
    flex-direction column
  &__message
    margin-top 25px
    margin-bottom 15px
    text-align center
  &__head
    font-weight 400
    margin-bottom 5px

.amount
  &__input
    border 2px solid #000
    padding 10px 20px
    border-radius 20px
    text-transform uppercase
    font-size 16px
    font-weight 300
    text-align center
    color #999
    &::placeholder
      color #999
  &__total-section
    display flex
    justify-content space-between
  &__total-item
    padding 5px 0
</style>