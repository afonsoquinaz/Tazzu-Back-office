const DatePicker = ({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-700">Start Date:</label>
            <input
                type="date"
                value={selectedStartDate || ""}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                className="border rounded px-2 py-1"
            />
            <label className="text-sm font-semibold text-blue-700">End Date:</label>
            <input
                type="date"
                value={selectedEndDate || ""}
                onChange={(e) => setSelectedEndDate(e.target.value)}
                className="border rounded px-2 py-1"
            />
        </div>
    );
};

export default DatePicker;