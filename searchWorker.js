const qaIndex = new Map();

self.onmessage = function(event) {
    const { action, qaData, searchTerm } = event.data;

    if (action === "index") {
        qaIndex.clear();
        qaData.forEach((qa, idx) => {
            const questionText = String(qa.question); // Ép kiểu về chuỗi
            const answersText = qa.answers.map(String).join(' '); // Ép kiểu toàn bộ mảng về chuỗi
            
            const combinedText = `${questionText} ${answersText}`.toLowerCase();
            qaIndex.set(idx, { text: combinedText, data: qa });
        });
    } 
    else if (action === "search") {
        if (!searchTerm) {
            self.postMessage([]); 
            return;
        }

        const results = [];
        qaIndex.forEach(({ text, data }) => {
            if (text.includes(searchTerm)) {
                results.push(data);
            }
        });

        self.postMessage(results);
    }
};
