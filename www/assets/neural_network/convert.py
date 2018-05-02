from keras.models import load_model
from webdnn.frontend.keras import KerasConverter
from webdnn.backend import generate_descriptor

model = load_model('./hd_model_keras.h5')

graph = KerasConverter(batch_size=1).convert(model)
exec_info = generate_descriptor("fallback", graph)  # also "webassembly", "webgl", "fallback" are available.
exec_info.save("./output")