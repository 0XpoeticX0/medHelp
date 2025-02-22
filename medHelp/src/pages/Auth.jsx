import {
  Tabs,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Radio,
  Card,
} from "antd";
import { Phone, MapPin, Mail, Lock, User } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const { Title } = Typography;
const { Option } = Select;

const Auth = () => {
  const loginForm = useForm({
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      address: "",
      phone: "",
      password: "",
      role: "patient",
    },
  });

  const onLoginSubmit = (data) => {
    console.log("Login data:", data);
    // Add login logic here
  };

  const onRegisterSubmit = (data) => {
    console.log("Registration data:", data);
    // Add registration logic here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md shadow-lg rounded-lg overflow-hidden bg-white">
          <Tabs defaultActiveKey="1" centered className="p-4">
            {/* Login Tab */}
            <Tabs.TabPane tab="Login" key="1">
              <div className="p-8">
                <Title level={2} className="text-center mb-6">
                  medHelp Login
                </Title>
                <Form
                  onFinish={loginForm.handleSubmit(onLoginSubmit)}
                  layout="vertical"
                >
                  <Form.Item
                    validateStatus={
                      loginForm.formState.errors.email ? "error" : ""
                    }
                    help={loginForm.formState.errors.email?.message}
                  >
                    <Controller
                      name="email"
                      control={loginForm.control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<Mail size={18} />}
                          placeholder="Email"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      loginForm.formState.errors.password ? "error" : ""
                    }
                    help={loginForm.formState.errors.password?.message}
                  >
                    <Controller
                      name="password"
                      control={loginForm.control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          prefix={<Lock />}
                          placeholder="Password"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                      Log In
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Tabs.TabPane>

            {/* Registration Tab */}
            <Tabs.TabPane tab="Register" key="2">
              <div className="p-8">
                <Title level={2} className="text-center mb-6">
                  medHelp Registration
                </Title>
                <Form
                  onFinish={registerForm.handleSubmit(onRegisterSubmit)}
                  layout="vertical"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      validateStatus={
                        registerForm.formState.errors.firstName ? "error" : ""
                      }
                      help={registerForm.formState.errors.firstName?.message}
                    >
                      <Controller
                        name="firstName"
                        control={registerForm.control}
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            prefix={<User />}
                            placeholder="First Name"
                            size="large"
                          />
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        registerForm.formState.errors.lastName ? "error" : ""
                      }
                      help={registerForm.formState.errors.lastName?.message}
                    >
                      <Controller
                        name="lastName"
                        control={registerForm.control}
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            prefix={<User />}
                            placeholder="Last Name"
                            size="large"
                          />
                        )}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    validateStatus={
                      registerForm.formState.errors.email ? "error" : ""
                    }
                    help={registerForm.formState.errors.email?.message}
                  >
                    <Controller
                      name="email"
                      control={registerForm.control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<Mail size={18} />}
                          placeholder="Email"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      validateStatus={
                        registerForm.formState.errors.age ? "error" : ""
                      }
                      help={registerForm.formState.errors.age?.message}
                    >
                      <Controller
                        name="age"
                        control={registerForm.control}
                        rules={{
                          required: "Age is required",
                          min: { value: 1, message: "Age must be positive" },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            placeholder="Age"
                            size="large"
                          />
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        registerForm.formState.errors.gender ? "error" : ""
                      }
                      help={registerForm.formState.errors.gender?.message}
                    >
                      <Controller
                        name="gender"
                        control={registerForm.control}
                        rules={{ required: "Gender is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Gender"
                            size="large"
                          >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        )}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    validateStatus={
                      registerForm.formState.errors.address ? "error" : ""
                    }
                    help={registerForm.formState.errors.address?.message}
                  >
                    <Controller
                      name="address"
                      control={registerForm.control}
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<MapPin size={18} />}
                          placeholder="Address"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    validateStatus={
                      registerForm.formState.errors.phone ? "error" : ""
                    }
                    help={registerForm.formState.errors.phone?.message}
                  >
                    <Controller
                      name="phone"
                      control={registerForm.control}
                      rules={{
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="tel"
                          prefix={<Phone size={18} />}
                          placeholder="Phone Number"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    validateStatus={
                      registerForm.formState.errors.password ? "error" : ""
                    }
                    help={registerForm.formState.errors.password?.message}
                  >
                    <Controller
                      name="password"
                      control={registerForm.control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          prefix={<Lock />}
                          placeholder="Password"
                          size="large"
                        />
                      )}
                    />
                  </Form.Item>

                  {/* Role Selection */}
                  <Form.Item label="Register as">
                    <Controller
                      name="role"
                      control={registerForm.control}
                      render={({ field }) => (
                        <Radio.Group
                          {...field}
                          className="flex justify-center gap-4"
                        >
                          <Card
                            hoverable
                            className={`w-40 cursor-pointer ${
                              field.value === "patient"
                                ? "border-2 border-blue-500"
                                : ""
                            }`}
                            onClick={() => field.onChange("patient")}
                          >
                            <div className="text-center">
                              <User className="text-2xl text-blue-500 mx-auto" />
                              <p className="mt-2">Patient</p>
                            </div>
                          </Card>
                          <Card
                            hoverable
                            className={`w-40 cursor-pointer ${
                              field.value === "volunteer"
                                ? "border-2 border-blue-500"
                                : ""
                            }`}
                            onClick={() => field.onChange("volunteer")}
                          >
                            <div className="text-center">
                              <User className="text-2xl text-blue-500 mx-auto" />
                              <p className="mt-2">Volunteer</p>
                            </div>
                          </Card>
                        </Radio.Group>
                      )}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 bg-blue-50 relative">
        <img
          src="https://assets.grok.com/users/2c61054b-87b9-42dd-b6e9-b1e4ce6d4e9c/xbrV6C7PDQWx3KQs-generated_image.jpg"
          alt="medHelp Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Auth;
