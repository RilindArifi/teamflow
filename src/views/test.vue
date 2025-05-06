<template>
  <div>
    <button @click="inviteUser">Invite User</button>
  </div>
</template>

<script setup>
import {supabase} from "@/lib/supabase";
import {useAuthStore} from "@/store/auth";
import {onMounted} from "vue";


    const store = useAuthStore()
    const inviteUser = async () => {
      // const { data, error } = await supabase.auth.admin.inviteUserByEmail('rilindarifi11@gmail.com')
      const { data, error } = await supabase.auth.admin.generateLink({
        type: 'invite',
        email: 'riar@sidora.eu',
        options: {
          redirectTo: 'http://localhost:5173/auth/login'
        }
      })

      if (data.user) {
        const { data: updateUser, error: updateError } = await supabase.auth.admin.updateUserById(data.user.id, {
          user_metadata: {
            company_id: store.session.user.id,
            member: true
          }
        })

        console.log(updateUser)
        // console.log(updateError)
      }

      if (error) {
        console.error('Error inviting user:', error.message);
        console.error('Error details:', error);
      } else {
        console.log('Invitation sent successfully:', data);
      }
    }

    onMounted(() => {
      store.fetchUser()
    })

</script>