import {
  Divider,
  Breadcrumb,
  Typography,
  Form,
  message,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import AdminAppLayout from "../../../Layouts/AdminLayout";
import AddCategoryModal from "./AddCategoryModal";
import AddNewRewardForm from "./form";

import { BASE_URL } from "../../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { ALL_CATEGORIES_API ,ADD_CATEGORY_API } from '../constants';
import { colors } from "../../../utils/colors";
const { Title, Text } = Typography;
const { Dragger } = Upload;

const AddNewReward = () => {
  const {id} = useSearchParams();
  console.log('id' , id)
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    data,
    isValidating : loading,
    mutate,
  } = useSWR({
    url: BASE_URL + ALL_CATEGORIES_API ,
  });
  useEffect(()=>{
    if(data?.result){
      setCategories(data?.result)
    }
  },[data])

  const toggleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const [variantName, setVariantName] = useState("");
  console.log(variantName);
  // const [id, setId] = useState(0);

  const handleCategoryChange = (values) => {
    mutate(async () => {
      try {
          const response = await axios.post(ADD_CATEGORY_API, values);
          message.success(response?.data?.message);
          toggleModal();
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <AdminAppLayout>
      <div
        style={{
          paddingLeft: 152,
          paddingRight: 152,
          marginTop: 40,
        }}
      >
        
        <Breadcrumb
          items={[
            {
              title: "Reward Inventery",
            },
            {
              title: "Add New Reward",
            },
          ]}
        />
        
        <Title level={4} style={{ color: colors.black, marginTop: 3 }}>
          Add New Reward
        </Title>
        <Divider type="horizontal" />
        <div>
          <div style={{ marginBottom: 60 }}>
            <AddNewRewardForm
              form={form}
              handleSubmit={handleSubmit}
              toggleModal={toggleModal}
              categories={categories}
              loading = {loading}
            />
          </div>
          
        </div>
      </div>
      

      {/*  Add NewCategory Modal*/}
      <AddCategoryModal
        open={open}
        footer={null}
        form={categoryForm}
        toggleModal={toggleModal}
        handleCategoryChange={handleCategoryChange}
      />
    </AdminAppLayout>
  );
};

export default AddNewReward;
