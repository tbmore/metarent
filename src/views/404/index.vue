<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <router-link to="/">
                <a-button type="primary">
                    Back Home
                </a-button>
            </router-link>
        </template>
    </a-result>
</template>
<style>
/*
<template>
  <draggable v-model="data"
             tag="tbody"
             item-key="name">
    <template #item="{ element }">
      <tr>
        <td scope="row">{{ element.key }}</td>
        <td>{{ element.name }}</td>
        <td>{{ element.money }}</td>
        <td>{{ element.address }}</td>
      </tr>
    </template>
    <template #header>
      <div class="btn-group list-group-item"
           role="group">
        <button class="btn btn-secondary">Add</button>
      </div>
    </template>

    <template #footer>
      <div class="btn-group list-group-item"
           role="group">
        <button class="btn btn-secondary">Replace</button>
      </div>
    </template>
  </draggable>
</template>
<script lang="ts">
interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

interface ColumnsType {
  title: string;
  dataIndex: string;
  className?: string;
}

import draggable from "vuedraggable";
import { reactive } from "vue";
export default {
  name: "table-example",
  components: {
    draggable,
  },
  setup() {
    const columns = reactive<ColumnsType[]>([
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Cash Assets",
        className: "column-money",
        dataIndex: "money",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ]);

    const data = reactive<DataType[]>([
      {
        key: "1",
        name: "John Brown",
        money: "￥300,000.00",
        address: "New York No. 1 Lake Park",
      },
      {
        key: "2",
        name: "Jim Green",
        money: "￥1,256,000.00",
        address: "London No. 1 Lake Park",
      },
      {
        key: "3",
        name: "Joe Black",
        money: "￥120,000.00",
        address: "Sidney No. 1 Lake Park",
      },
    ]);
    console.log(data);
    return {
      data,
      columns,
    };
  },
};
</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
.buttons {
  margin-top: 35px;
}
*/
</style>
