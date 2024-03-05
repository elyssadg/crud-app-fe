import FormInput from '../../components/FormInput.vue'
import Button from '../../components/Button.vue'
import TableHeader from '../../components/TableHeader.vue'
import { useCurrentUserStore } from '../../stores/authenticated-user.js'
import { mapActions, mapState } from 'pinia'

export default {
  name: "HomeView",
  components: {
    FormInput,
    Button,
    TableHeader
  },
  data () {
    return {
      itemName: "",
      itemStock: 0,
      items: [],
      selectedUpdateProduct: "",
      updateItemName: "",
      updateItemStock: 0,
      selectedPurchaseProduct: "",
      purchaseItemName: "",
      purchaseItemStock: 0,
      error: "",
      purchaseError: "",
      updateError: ""
    }
  },
  methods: {
    ...mapActions(useCurrentUserStore, ['getCurrentUser', 'setCurrentUser']),
    fetchProductData() {
      this.items = []
      fetch(`http://localhost:8081/backend/products`, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((body) => {
          this.items = body.data.products
        })
    },
    addProduct() {
      fetch(`http://localhost:8081/backend/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: this.itemName,
            stock: this.itemStock
          })
        })
        .then((res) => res.json())
        .then(body => {
          if (body.code !== 200) {
            this.error = body.message
          } else {
            this.error = ""
            this.itemName = ""
            this.itemStock = 0
          }
          this.fetchProductData()
        })
    },
    deleteProduct(id) {
      fetch(`http://localhost:8081/backend/products/${id}`, {
          method: 'DELETE',
        })
        .then(() => {
          this.fetchProductData()
        })
    },
    updateProduct(id) {
      fetch(`http://localhost:8081/backend/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            newName: this.updateItemName,
            newStock: this.updateItemStock
          })
        })
        .then((res) => res.json())
        .then(body => {
          if (body.code === 200) {
            this.closeUpdateModal()
            this.fetchProductData()
          } else {
            console.log(body.message)
            this.updateError = body.message
            console.log(this.updateError)
          }
        })
    },
    purchaseProduct(id) {
        fetch(`http://localhost:8081/backend/purchase`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              productId: this.selectedPurchaseProduct,
              totalPurchase: this.purchaseItemStock
            })
          })
          .then((res) => res.json())
          .then(body => {
            if (body.code === 200) {
              setTimeout(() => {
                  this.closePurchaseModal()
                  this.fetchProductData();
              }, 500);
            } else {
              this.purchaseError = body.message
            }
          })
    },
    showUpdateModal(id, name, stock) {
      this.selectedUpdateProduct = id
      this.updateItemName = name
      this.updateItemStock = stock
    },
    closeUpdateModal() {
      this.selectedUpdateProduct = ""
      this.updateItemName = ""
      this.updateItemStock = 0
    },
    showPurchaseModal(id, name, stock) {
        this.selectedPurchaseProduct = id
        this.purchaseItemName = name
        this.purchaseItemStock = 0
    },
    closePurchaseModal() {
        this.selectedPurchaseProduct = ""
        this.purchaseItemName = ""
        this.purchaseItemStock = 0
    },
    authenticateUser() {
      const token = localStorage.getItem('token')
      if (token) {
        fetch(`http://localhost:8081/backend/users/${token}`, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((body) => {
          console.log(body.data)
          if (body.data == null) {
              this.setCurrentUser(null)
              this.$router.push('/login')
          } else {
              this.setCurrentUser(body.data.user)
          }
        })
      } else {
        this.$router.push('/login')
      }
      // if (this.getCurrentUser() == null) this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(useCurrentUserStore, ['user']),
    isEmpty() {
      return this.items.length === 0
    },
    isUpdateModalShown() {
      return (this.selectedUpdateProduct === "") ? false : true
    },
    isPurchaseModalShown() {
        return (this.selectedPurchaseProduct === "") ? false : true
    },
    isError() {
      return (this.error === "") ? false : true
    },
    isPurchaseError() {
      return (this.purchaseError === "") ? false : true
    },
    isUpdateError() {
      return (this.updateError === "") ? false : true
    },
    ...mapState(useCurrentUserStore, ['user'])
  },
  created () {
    // this.getCurrentUser()
    this.authenticateUser()
    this.fetchProductData()
  }
}