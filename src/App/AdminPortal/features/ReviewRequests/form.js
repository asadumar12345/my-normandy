import React from "react";
import { Typography, Button, Input, Form } from "antd";
import { colors } from "../../utils/colors";

const { Text } = Typography;
const { TextArea } = Input;

const CancelReasonForm = ({
  id,
  form,
  handleSubmit,
  closeModal,
  listLoading,
  setModalOpen,
}) => {
  return (
    <div style={{ padding: 30 }}>
      <Text style={{ fontSize: 24, fontWeight: 500, color: colors.black }}>
        Reason to Cancel Request
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item>
          <TextArea
            style={{ marginTop: 24 }}
            rows={4}
            placeholder="Type reason here..."
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => setModalOpen(false)}
            htmlType="submit"
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CancelReasonForm;
