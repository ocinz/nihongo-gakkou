import React, { useState } from 'react';

export default function Page() {
    const [roleName, setRoleName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Role Name:', roleName);
    };

    return (
        <div>
            <h1>Add New Role</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="roleName">Role Name:</label>
                    <input
                        type="text"
                        id="roleName"
                        value={roleName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Role</button>
            </form>
        </div>
    );
};
