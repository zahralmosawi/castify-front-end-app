import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ChangePasswordForm = () => {
    const [form, setForm] = useState({
        currentPassword: " ",
        newPassword: " "
    })

    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()

    function handleChange(event){
        const {name, value} = event.target
        setForm(prev => ({...prev, [name]: value}))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setSaving(true)
            const token = localStorage.getItem('token')
            if (!token) {
                alert('Please log in first')
                return navigate('/login')
            }
            const response = await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/changePassword`, {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            alert('Password changed successfully')
            navigate('/profile')
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to change password')
        } 
    }
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password</label>
        <input type="password" id="currentPassword" name="currentPassword" onChange={handleChange} required/>

        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" name="newPassword" onChange={handleChange} required/>
        
        <button type="submit" disabled={saving}> {saving ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
