import { useState } from 'react';

// Rgba color definition
interface RgbaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export default function RaylibColorGen() {
    const [color, setColor] = useState<RgbaColor>({ r: 0, g: 123, b: 255, a: 204 });
    const [colorName, setColorName] = useState<string>('Pick a name');

    const handleColorChange = (channel: keyof RgbaColor, value: number) => {
        setColor(prevColor => {
            const newColor = { ...prevColor, [channel]: value };
            newColor[channel] = Math.min(255, Math.max(0, newColor[channel]));
            return newColor;
        });
    };

    const toCssRgbaColor = () => {
        const { r, g, b, a } = color;
        const alphaCss = (a / 255).toFixed(2);
        return `rgba(${r}, ${g}, ${b}, ${alphaCss})`;
    }

    const toInvertedCssRgbaColor = () => {
        let { r, g, b } = color;
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
        return `rgba(${r}, ${g}, ${b}, ${1})`;
    }

    // TODO add an input field and add to the return so I can name it
    const toRaylibRgbaColor = () => {
        const { r, g, b, a } = color;
        return `#define ${colorName} (Color){ ${r}, ${g}, ${b}, ${a} }`;
    };

    const copyToClipboard = () => {
        const rgbaValue = toRaylibRgbaColor();
        const messageBox = document.createElement('div');
        messageBox.textContent = 'RGBA value copied to clipboard';
        messageBox.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black';
        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.remove();
        }, 2000);

        navigator.clipboard.writeText(rgbaValue).catch(err => {
            console.error('didnt copy, idk why ask the guy who wrote this, also error:', err);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-2/3 h-full bg-fuchsia-400 text-black p-4">
                <div className="bg-blue-400 p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-fuchsia-700">
                        RGBA Color Picker
                    </h1>

                    {/* Color Preview Box */}
                    <div
                        className="w-full h-40 mb-6 shadow-md border border-gray-700"
                        style={{ backgroundColor: toCssRgbaColor() }}
                    ></div>

                    {/* Sliders and Inputs for each channel */}
                    {['r', 'g', 'b', 'a'].map((channel) => (
                        <div key={channel} className="mb-4">
                            <label className="block text-sm font-medium capitalize mb-2">
                                {channel === 'a' ? `Alpha (0-255)` : `${channel.toUpperCase()} (0-255)`}
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min={0}
                                    max={255}
                                    step={1}
                                    value={color[channel as keyof RgbaColor]}
                                    onChange={(e) =>
                                        handleColorChange(channel as keyof RgbaColor, parseInt(e.target.value))
                                    }
                                    className="w-full h-2 bg-fuchsia-400 rounded-lg appearance-none cursor-pointer"
                                />
                                <input
                                    type="number"
                                    min={0}
                                    max={255}
                                    step={1}
                                    value={color[channel as keyof RgbaColor]}
                                    onChange={(e) =>
                                        handleColorChange(channel as keyof RgbaColor, parseInt(e.target.value))
                                    }
                                    className="w-20 p-2 bg-fuchsia-400 border border-gray-600 rounded-md text-center text-sm"
                                />
                            </div>
                        </div>
                    ))}

                    <div className='mb-4'>
                        <label className="block text-sm font-medium capitalize mb-2">
                            Color Name
                        </label>
                        <div className='flex items-center space-x-4'>
                            <input
                                type="text"
                                value={colorName}
                                onChange={(e) => setColorName(e.target.value)}
                                className="w-full p-2 border border-gray-600 rounded-md text-center text-sm"
                                style={{ backgroundColor: toCssRgbaColor(), color: toInvertedCssRgbaColor() }}
                            />
                        </div>
                    </div>

                    {/* Display and Copy RGBA value */}
                    <div className="mt-6 text-center">
                        <p className="text-xs font-mono mb-4 bg-fuchsia-400 py-4 rounded-lg break-words shadow-inner">
                            {toRaylibRgbaColor()}
                        </p>
                        <button
                            onClick={copyToClipboard}
                            className="w-full px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                            style={{ backgroundColor: toCssRgbaColor(), color: toInvertedCssRgbaColor() }}
                        >
                            Copy RGBA Value
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
