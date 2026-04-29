import { useState } from 'react';
import usePlaidsService from '../../service/PlaidsService';

const ProductForm = () => {
    const { sendProductData, loading, error } = usePlaidsService();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        color: '',
        size: '',
        descr: '',
        details: '',
        delivery: '',
        files: []  // ← змінили з file на files (масив)
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // ← перетворюємо FileList в масив
        console.log('Вибрано файли:', files);
        setFormData(prev => ({
            ...prev,
            files: files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('color', formData.color);
        formDataToSend.append('size', formData.size);
        formDataToSend.append('descr', formData.descr);
        formDataToSend.append('details', formData.details);
        formDataToSend.append('delivery', formData.delivery);

        // Додаємо всі файли з однаковою назвою 'images'
        if (formData.files.length > 0) {
            formData.files.forEach(file => {
                formDataToSend.append('images', file); // ← додаємо кожен файл
            });
            console.log(`Додано ${formData.files.length} файлів до FormData`);
        } else {
            console.log('Файли відсутні!');
        }

        const result = await sendProductData(formDataToSend);
        console.log('Результат:', result);

        if (!error) {
            alert('Товар створено!');
            setFormData({
                name: '',
                price: '',
                color: '',
                size: '',
                descr: '',
                details: '',
                delivery: '',
                files: []
            });
            // Скидаємо input file
            e.target.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Форма товару</h2>
            {error && <div style={styles.error}>{error}</div>}
            {loading && <div style={styles.loading}>Відправка...</div>}

            <div style={styles.formGroup}>
                <label>Файли (можна вибрати декілька):</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple  // ← ДОДАНО: дозволяє вибрати декілька файлів
                />
                {formData.files.length > 0 && (
                    <div>
                        <p>Вибрано файлів: {formData.files.length}</p>
                        <ul>
                            {formData.files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div style={styles.formGroup}>
                <label>Назва:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div style={styles.formGroup}>
                <label>Ціна:</label>
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>

            <div style={styles.formGroup}>
                <label>Колір:</label>
                <input type="text" name="color" value={formData.color} onChange={handleInputChange} />
            </div>

            <div style={styles.formGroup}>
                <label>Розмір:</label>
                <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
            </div>

            <div style={styles.formGroup}>
                <label>Опис:</label>
                <textarea name="descr" value={formData.descr} onChange={handleInputChange} rows="3" />
            </div>

            <div style={styles.formGroup}>
                <label>Деталі:</label>
                <textarea name="details" value={formData.details} onChange={handleInputChange} rows="3" />
            </div>

            <div style={styles.formGroup}>
                <label>Доставка:</label>
                <input type="text" name="delivery" value={formData.delivery} onChange={handleInputChange} />
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Відправка...' : 'Відправити'}
            </button>
        </form>
    );
};

const styles = {
    form: { maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' },
    formGroup: { marginBottom: '15px' },
    button: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
    error: { backgroundColor: '#ff4444', color: 'white', padding: '10px', borderRadius: '4px', marginBottom: '15px' },
    loading: { backgroundColor: '#ff9800', color: 'white', padding: '10px', borderRadius: '4px', marginBottom: '15px' }
};

export default ProductForm;