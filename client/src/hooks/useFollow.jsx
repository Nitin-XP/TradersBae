import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = () => {
    const queryClient = useQueryClient();

    const { mutate: follow, isPending } = useMutation({
        mutationFn: async ({ userId }) => {
            try {
                const res = await axios.post(`http://localhost:8000/api/users/follow/${userId}`);
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");

                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: (data, variables) => {
            const { username, fullname } = variables;
            toast.success(`You started following @${username || fullname}!`);
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['suggestedUser'] }),
                queryClient.invalidateQueries({ queryKey: ['authUser'] }),
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });
    return { follow, isPending }
}

export default useFollow; 