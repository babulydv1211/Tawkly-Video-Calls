import { Loader } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
// import { LoaderIcon } from "react-hot-toast";

const PageLoader = () => {
  const {theme} =useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
        <Loader className="animate-spin size-10 text-primary" />
      
    </div>
  );
}

export default PageLoader;
