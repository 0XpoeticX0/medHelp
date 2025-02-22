import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router";

const { Title } = Typography;

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <Title level={2} className="text-center mb-6">
            medHelp Login
          </Title>

          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email Field */}
            <Form.Item
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                )}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                )}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Log In
              </Button>
            </Form.Item>
            <div className="text-center mt-4">
              <span className="text-gray-600">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Create account
              </Link>
            </div>
          </Form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src="https://assets.grok.com/users/2c61054b-87b9-42dd-b6e9-b1e4ce6d4e9c/xbrV6C7PDQWx3KQs-generated_image.jpg"
            alt="medHelp Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
