import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, KeyIcon, PaintBrushIcon, NotificationsIcon, UserGroupIcon, GlobeAltIcon, SunIcon, MoonIcon, DesktopComputerIcon, AccessibilityIcon } from './icons';

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800 first:pt-0 first:border-none">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const SettingsItem: React.FC<{icon: React.ElementType, title: string, description: string, control: React.ReactNode}> = ({icon: Icon, title, description, control}) => (
    <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
            <Icon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
            <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
        </div>
        <div className="flex-shrink-0 ml-4">{control}</div>
    </div>
);

const Toggle: React.FC<{checked: boolean, onChange: () => void}> = ({checked, onChange}) => (
     <button onClick={onChange} className={`w-12 h-7 rounded-full p-1 flex items-center transition-colors ${checked ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
        <div className="w-5 h-5 bg-white rounded-full transition-transform"></div>
    </button>
);

type AccentColor = 'orange' | 'blue' | 'pink' | 'green';
type FontSize = 'sm' | 'base' | 'lg';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState({
        twoFactorAuth: true,
        allowTagging: 'friends',
        allowDMs: 'everyone',
        notifications: {
            likes: true,
            comments: true,
            follows: true,
            mentions: true,
            system: false,
        },
        accentColor: 'orange' as AccentColor,
        fontSize: 'base' as FontSize,
    });
    
    useEffect(() => {
        const root = document.documentElement;
        // Remove old accent classes
        root.classList.remove('accent-orange', 'accent-blue', 'accent-pink', 'accent-green');
        // Add new accent class
        root.classList.add(`accent-${settings.accentColor}`);
        
        // Handle font size
        root.style.fontSize = settings.fontSize === 'sm' ? '14px' : settings.fontSize === 'lg' ? '18px' : '16px';
    }, [settings.accentColor, settings.fontSize]);


    const handleSettingChange = (key: keyof typeof settings, value: any) => {
        setSettings(prev => ({...prev, [key]: value}));
    }
    
    const handleNotificationChange = (key: keyof typeof settings.notifications) => {
        setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, [key]: !prev.notifications[key] }
        }));
    }
    
    const accentColors: { name: AccentColor, class: string }[] = [
        { name: 'orange', class: 'bg-orange-500' },
        { name: 'blue', class: 'bg-blue-500' },
        { name: 'pink', class: 'bg-pink-500' },
        { name: 'green', class: 'bg-green-500' },
    ];
    
    const fontSizes: { name: FontSize, label: string }[] = [
        { name: 'sm', label: 'Small' },
        { name: 'base', label: 'Default' },
        { name: 'lg', label: 'Large' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-8">
             <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account, appearance, and privacy.</p>
            </div>
            
            <div className="space-y-6">
                <SettingsSection title="Appearance">
                    <SettingsItem icon={PaintBrushIcon} title="Accent Color" description="Customize the main color of the interface." control={
                        <div className="flex items-center space-x-2">
                            {accentColors.map(color => (
                                <button key={color.name} onClick={() => handleSettingChange('accentColor', color.name)} className={`w-8 h-8 rounded-full ${color.class} ${settings.accentColor === color.name ? 'ring-2 ring-offset-2 ring-black dark:ring-white ring-offset-white dark:ring-offset-gray-900' : ''}`}></button>
                            ))}
                        </div>
                    }/>
                     <SettingsItem icon={AccessibilityIcon} title="Font Size" description="Adjust the text size for better readability." control={
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                           {fontSizes.map(size => (
                               <button key={size.name} onClick={() => handleSettingChange('fontSize', size.name)} className={`px-3 py-1 text-sm font-semibold rounded-full ${settings.fontSize === size.name ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-600 dark:text-gray-300'}`}>{size.label}</button>
                           ))}
                        </div>
                    }/>
                </SettingsSection>

                <SettingsSection title="Privacy & Security">
                     <SettingsItem icon={ShieldCheckIcon} title="Two-Factor Authentication" description="Add an extra layer of security to your account." control={<Toggle checked={settings.twoFactorAuth} onChange={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}/>}/>
                     <SettingsItem icon={UserGroupIcon} title="Who can tag you" description="Control who can tag you in photos and posts." control={
                         <select value={settings.allowTagging} onChange={(e) => handleSettingChange('allowTagging', e.target.value)} className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
                            <option value="everyone">Everyone</option><option value="friends">Friends Only</option><option value="none">No One</option>
                        </select>
                     }/>
                     <SettingsItem icon={GlobeAltIcon} title="Who can send DMs" description="Filter who can send you direct messages." control={
                          <select value={settings.allowDMs} onChange={(e) => handleSettingChange('allowDMs', e.target.value)} className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
                            <option value="everyone">Everyone</option><option value="friends">Friends Only</option>
                        </select>
                     }/>
                </SettingsSection>
                
                <SettingsSection title="Notifications">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                        <SettingsItem 
                            key={key} 
                            icon={NotificationsIcon} 
                            title={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            description={`Notify me about new ${key}.`}
                            control={<Toggle checked={value} onChange={() => handleNotificationChange(key as keyof typeof settings.notifications)}/>}
                        />
                    ))}
                </SettingsSection>

            </div>

        </div>
    );
};

export default Settings;
