<template>
  <el-table :data="tableData" border style="width: 1100px; margin: 10px auto">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="account" label="账号" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column prop="pic" show-overflow-tooltip label="头像" />
    <el-table-column width="90">
      <template #default="scope">
        <el-button @click="editUser(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="DialogVisible" title="修改用户" width="500" align-center>
    ID:
    <el-input
      style="border: 1px solid black; margin: 10px"
      :value="selectedUser.id"
      disabled
    />
    账号:
    <el-input
      style="border: 1px solid black; margin: 10px"
      :value="selectedUser.account"
      disabled
    />
    昵称:
    <el-input
      style="border: 1px solid black; margin: 10px"
      :placeholder="selectedUser.nickname"
      v-model="input1"
    />
    头像:
    <el-input
      style="border: 1px solid black; margin: 10px"
      :placeholder="selectedUser.pic"
      v-model="input2"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateUser">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const user = ref([]);
const tableData = ref([]);
const input1 = ref("");
const input2 = ref("");
const DialogVisible = ref(false);
const selectedUser = ref({});

const getUsers = async () => {
  const response = await proxy.$api.getUsers();
  user.value = response.data;
  tableData.value = user.value.filter((item) => item.isAdmin === false);
};

const editUser = (userData) => {
  selectedUser.value = userData;
  DialogVisible.value = true;
};

const cancel = () => {
  DialogVisible.value = false;
};

const updateUser = async () => {
  const updatedData = {
    id: selectedUser.value.id, // 需要传递用户ID
    nickname: input1.value,
    pic: input2.value,
  };
  const response = await proxy.$api.updateUser(updatedData);
  DialogVisible.value = false;
  if (response) {
    input1.value = "";
    input2.value = "";
    history.go(0);
  }
};

onMounted(() => {
  getUsers();
});
</script>

<style scoped lang="scss"></style>
