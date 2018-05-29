
dnn_fallback_kernel={


tensordot: function(input_arrays, output_arrays, option) {
var A = input_arrays[0];
var B = input_arrays[1];
var C = output_arrays[0];

var index2pos = function(index, stride, shape) {
    var i = 0, pos = [];
    for (i = 0; i < stride.length; i++) pos[i] = Math.floor(index / stride[i]) % shape[i];
    return pos;
};

var pos2index = function(pos, stride) {
    var i = 0, index = 0;
    for (i = 0; i < stride.length; i++) index += pos[i] * stride[i];
    return index;
};

var c_index, c_pos;
var a_base_index, a_offset;
var b_base_index, b_offset;
var i;
var sum = 0;
for (c_index = 0; c_index < C.length; c_index++) {
    c_pos = index2pos(c_index, option.stride_C, option.shape_C);
    a_base_index = pos2index(c_pos, option.stride_A_for_C_axes);
    b_base_index = pos2index(c_pos, option.stride_B_for_C_axes);

    sum = 0;
    for (i = 0; i < option.reduction_size; i++) {
        a_offset = pos2index(index2pos(i, option.stride_A_reduced_axes, option.shape_A_reduced_axes), option.stride_A_reduced_axes_whole);
        b_offset = pos2index(index2pos(i, option.stride_B_reduced_axes, option.shape_B_reduced_axes), option.stride_B_reduced_axes_whole);

        sum += A[a_base_index + a_offset] * B[b_base_index + b_offset];
    }
    C[c_index] = sum;
}

},




elementwiseadd_a390ad2e078fc68ac251d2f594dc0f96834a1e57429714605dbf3a02: function(input_arrays, output_arrays, option) {
    var v1 = input_arrays[0];
    var v2 = input_arrays[1];
    var v3 = input_arrays[2];
    var D0 = option['7'];
    var d0;
    for (d0 = 0; d0 < D0; d0 += 1) {
        var v4 = v1[d0];
        var v5 = v2[d0];
        var v6;
        (function(){
            v6 = v5 + v4;
        })();
        v3[d0] = v6;
    }
},

relu_3693ec08de79c27ab35127ab0a10897afa2249f09efd879f2a8158d1: function(input_arrays, output_arrays, option) {
    var v1 = input_arrays[0];
    var v2 = input_arrays[1];
    var D0 = option['5'];
    var d0;
    for (d0 = 0; d0 < D0; d0 += 1) {
        var v3 = v1[d0];
        var v4;
        (function(){
            v4 = v3 > 0 ? v3 : 0;
        })();
        v2[d0] = v4;
    }
},

};
