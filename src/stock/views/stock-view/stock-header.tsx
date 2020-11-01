import {PlusSquareOutlined} from "@ant-design/icons";
import {Button} from "antd";
import React, {useCallback} from "react";
import {AppContentHeader} from "../../../main/components/app-layout";
import {closeDrawer, openDrawer, useDrawerContext} from "../../../main/lib/drawer-context";
import {useCreateProductsMutation} from "../../../main/lib/generated";
import ProductForm from "../../components/product-form";
import {useRefetchProductsContext} from "./stock-view.lib";

export default function StockHeader() {
  const {dispatch: drawerDispatch} = useDrawerContext();
  const {refetch} = useRefetchProductsContext();

  const [createProduct] = useCreateProductsMutation();
  const onSubmit = useCallback(
    async values => {
      try {
        await createProduct({variables: {input: values}});
        await refetch();
        closeDrawer(drawerDispatch);
      } catch (e) {
        console.error(e);
      }
    },
    [createProduct, drawerDispatch, refetch],
  );

  const openForm = useCallback(() => {
    openDrawer(drawerDispatch, {
      title: "Добавить продукт",
      body: <ProductForm onSubmit={onSubmit} />,
      width: "50vw",
    });
  }, [drawerDispatch, onSubmit]);

  return (
    <AppContentHeader>
      <div>
        <Button icon={<PlusSquareOutlined />} onClick={openForm}>
          Добавить Продукт
        </Button>
      </div>
    </AppContentHeader>
  );
}
