import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, User, Mail, Shield, Calendar, Building } from "lucide-react"

export const HRProfilesPage = () => {
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "HR-Admin",
        organization: "",
        joinDate: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        // Get HR profile data from the HR state
        if (HRState.data) {
            setProfileData({
                firstname: HRState.data.firstname || "",
                lastname: HRState.data.lastname || "",
                email: HRState.data.email || "",
                role: HRState.data.role || "HR-Admin",
                organization: HRState.data.organizationName || "",
                joinDate: HRState.data.createdAt ? new Date(HRState.data.createdAt).toLocaleDateString() : "",
                phone: HRState.data.phone || "",
                address: HRState.data.address || ""
            })
        }
    }, [HRState.data])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        // TODO: Add API call to update HR profile
        console.log("Saving profile:", profileData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        // Reset to original data
        if (HRState.data) {
            setProfileData({
                firstname: HRState.data.firstname || "",
                lastname: HRState.data.lastname || "",
                email: HRState.data.email || "",
                role: HRState.data.role || "HR-Admin",
                organization: HRState.data.organizationName || "",
                joinDate: HRState.data.createdAt ? new Date(HRState.data.createdAt).toLocaleDateString() : "",
                phone: HRState.data.phone || "",
                address: HRState.data.address || ""
            })
        }
    }

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    if (HRState.isLoading) {
        return <Loading />
    }

    return (
        <div className="hr-profile-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="profile-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My HR Profile</h1>
                <div className="profile-actions">
                    {!isEditing ? (
                        <Button onClick={handleEdit} className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                Save Changes
                            </Button>
                            <Button onClick={handleCancel} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-content grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>
                            Your personal details and contact information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{profileData.firstname || "Not provided"}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.lastname}
                                        onChange={(e) => handleInputChange('lastname', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{profileData.lastname || "Not provided"}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{profileData.email || "Not provided"}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{profileData.phone || "Not provided"}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Address</label>
                            {isEditing ? (
                                <textarea
                                    value={profileData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    rows={3}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{profileData.address || "Not provided"}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Professional Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Professional Information
                        </CardTitle>
                        <CardDescription>
                            Your role and organizational details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                Role
                            </label>
                            <p className="mt-1 text-gray-900 bg-blue-100 px-3 py-2 rounded-md inline-block">
                                {profileData.role}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                Organization
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profileData.organization}
                                    onChange={(e) => handleInputChange('organization', e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{profileData.organization || "Not provided"}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Join Date
                            </label>
                            <p className="mt-1 text-gray-900">{profileData.joinDate || "Not available"}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Account Status</label>
                            <p className="mt-1 text-green-600 bg-green-100 px-3 py-2 rounded-md inline-block">
                                Active
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
