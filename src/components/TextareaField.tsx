type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  propsData?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const TextareaField = ({ propsData, ...props }: TextareaProps) => {
  return (
    <textarea
      {...propsData}
      {...props}
      className="w-full pl-4 py-3 rounded-lg bg-dark-400 outline-none border border-gray-800 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
    />
  );
};

export default TextareaField;
