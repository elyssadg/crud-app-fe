<script src="./js/home-view.js"></script>

<template class="relative">
  <div class="w-[90%] mx-auto my-10">
    <h1 class="text-title text-purple-mid font-medium">Welcome to StorEase</h1>
    <div class="mt-4 flex justify-between">
      <div class="w-[30%]">
        <h3 class="text-heading text-black font-normal">Add New Product</h3>
        <FormInput type="text" label="Name" v-model="itemName" />
        <FormInput type="number" label="Stock" v-model="itemStock" />
        <p v-if="isError" class="text-red text-subname mt-4">{{ this.error }}</p>
        <Button text="Add Product" class="w-full mt-4 bg-purple-mid text-white" @click="this.addProduct()"></Button>
      </div>

      <div v-if="!isEmpty" class="w-[65%]">
        <table class="w-full border-separate border-spacing-y-2">
          <tr class="w-full py-2 bg-purple-mid">
            <TableHeader class="w-[30%] rounded-l-default" header="Product ID"></TableHeader>
            <TableHeader class="w-[23%]" header="Product Name"></TableHeader>
            <TableHeader class="w-[23%]" header="Product Stock"></TableHeader>
            <TableHeader class="w-[23%] rounded-r-default" header="Action"></TableHeader>
          </tr>

          <tr v-for="(item, index) in items" :key="index" class="w-full border-b-2 border-b-purple-light">
            <td class="w-[30%] text-center text-name text-black font-normal">{{ item.id }}</td>
            <td class="w-[23%] text-center text-name text-black font-normal">{{ item.name }}</td>
            <td class="w-[23%] text-center text-name text-black font-normal">{{ item.stock }}</td>
            <td class="w-[23%] text-center text-name text-black font-normal">
              <Button text="Update" class="text-purple-mid text-subname" @click="this.showUpdateModal(item.id, item.name, item.stock)"></Button><br>
              <Button text="Purchase" class="text-green text-subname" @click="this.showPurchaseModal(item.id, item.name, item.stock)"></Button><br>
              <Button text="Delete" class="text-orange text-subname" @click="this.deleteProduct(item.id)"></Button>
            </td>
          </tr>
        </table>
      </div>

      <div v-else class="w-[65%]">
        <table class="w-full border-separate border-spacing-y-2">
          <tr class="w-full py-2 bg-purple-mid">
            <TableHeader class="w-[30%] rounded-l-default" header="Product ID"></TableHeader>
            <TableHeader class="w-[23%]" header="Product Name"></TableHeader>
            <TableHeader class="w-[23%]" header="Product Stock"></TableHeader>
            <TableHeader class="w-[23%] rounded-r-default" header="Action"></TableHeader>
          </tr>

          <tr>
            <td class="text-black text-name font-normal">No Data Found</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  
  <div v-if="isUpdateModalShown" class="w-full h-screen absolute left-0 top-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div class="flex flex-col w-1/2 p-10 rounded-default bg-white">
      <Button text="X" class="p-0 text-black text-subheading self-end" @click="this.closeUpdateModal()"></Button>
      <h3 class="text-heading text-black font-normal">Update Product</h3>
      <FormInput type="text" label="Name" v-model="this.updateItemName" />
      <FormInput type="number" label="Stock" v-model="this.updateItemStock" />
      <p v-if="isUpdateError" class="text-red text-subname mt-4">{{ this.updateError }}</p>
      <Button text="Update Product" class="w-full mt-4 bg-purple-dark text-white" @click="this.updateProduct(this.selectedUpdateProduct)"></Button>
    </div>
  </div>

  <div v-if="isPurchaseModalShown" class="w-full h-screen absolute left-0 top-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div class="flex flex-col w-1/2 p-10 rounded-default bg-white">
      <Button text="X" class="p-0 text-black text-subheading self-end" @click="this.closePurchaseModal()"></Button>
      <h3 class="text-heading text-black font-normal">Purchase Product</h3>
      <FormInput type="text" label="Name" v-model="this.purchaseItemName" disabled="true" />
      <FormInput type="number" label="Total Purchase" v-model="this.purchaseItemStock" />
      <p v-if="isPurchaseError" class="text-red text-subname mt-4">{{ this.purchaseError }}</p>
      <Button text="Purchase Product" class="w-full mt-4 bg-purple-dark text-white" @click="this.purchaseProduct(this.selectedPurchaseProduct)"></Button>
    </div>
  </div>
</template>
