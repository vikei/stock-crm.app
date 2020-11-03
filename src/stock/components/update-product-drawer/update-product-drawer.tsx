import React, {useCallback, useEffect} from "react";
import {goBackFromFakeLocation, goToFakeLocation} from "../../../library/utils/fake-history";
import {closeDrawer, useDrawerContext} from "../../../main/lib/drawer-context";
import {ProductQueryVariables} from "../../../main/lib/generated";
import UpdateProductContainer from "../update-product-container";

interface UpdateProductDrawerProps {
  id: ProductQueryVariables["id"];
}

export default function UpdateProductDrawer({id}: UpdateProductDrawerProps) {
  useEffect(() => {
    goToFakeLocation(`/stock/product/${id}/update`);

    return () => {
      goBackFromFakeLocation();
    };
  }, [id]);

  const {dispatch: drawerDispatch} = useDrawerContext();
  const handleSuccess = useCallback(async () => {
    closeDrawer(drawerDispatch);
  }, [drawerDispatch]);

  return <UpdateProductContainer id={id} onSuccess={handleSuccess} />;
}
