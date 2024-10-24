import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../Constants/constant';

const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await axios.post(BASE_URL + `/api/users/update/`, formData);
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || `Something Went Wrong!`);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Profile Updated Succefully!!");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateProfile, isUpdatingProfile };
}

export default useUpdateUserProfile