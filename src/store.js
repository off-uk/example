import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'process',
    card: {
      number: '',
      holder: '',
      expDate: {
        month: '',
        year: ''
      },
      cvc: ''
    },
    amount: '',
    comission: {
      percent: '1',
      min: '500'
    },
    totalAmount: ''
  },
  mutations: {
    changeCardValues(state, values) {
      state.card.number = values.number;
    },
    updateHolder(state, holder) {
      state.card.holder = holder
    },
    updateCvc(state, cvc) {
      state.card.cvc = cvc
    },
    updateExpDateMonth(state, month) {
      state.card.expDate.month = month
    },
    updateExpDateYear(state, year) {
      state.card.expDate.year = year
    },
    updateAmount(state, amount) {
      state.amount = amount
    },
    updateTotalAmount(state, totalAmount) {
      state.totalAmount = totalAmount
    },
    changeStatus(state, status) {
      state.status = status
    },
    // clearData(state, data) {
    //   state.card = data.card
    //   state.amount = data.amount
    //   state.totalAmount = data.totalAmount
    // }
  },
  getters: {
    getAmount: state => state.amount,
    getCommission: state => (+state.amount * +state.comission.percent / 100) + +state.comission.min,
    getTotalAmount: state => state.totalAmount,
    getCardInfo: state => state.card,
    getStatus: state => state.status
  },
  actions: {
    changeCardValues(context, values) {
      context.commit('changeCardValues', values)
    },
    submit(context) {
      setTimeout(() => {

        // 2/1 Success/Error
        const s = Math.floor(Math.random() * (4 - 1)) + 1;

        (s == 1 || s == 2) ? context.commit('changeStatus', 'success') : context.commit('changeStatus', 'error')

      }, 1000)
    },
    repeat(context) {
      context.commit('changeStatus', 'process')
    }
  }
})
